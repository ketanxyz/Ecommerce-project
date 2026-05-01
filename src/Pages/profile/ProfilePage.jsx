import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/navbar/Header";
import "./ProfilePage.css";

const ProfilePage = ({ cart }) => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [addrError, setAddrError] = useState('');
  const [addrSaving, setAddrSaving] = useState(false);

  const blankForm = { fullName: user?.name || '', phone: user?.phone || '', line1: '', line2: '', city: '', state: '', pincode: '', isDefault: false };
  const [addrForm, setAddrForm] = useState(blankForm);

  if (!user) {
    navigate('/login');
    return null;
  }

  const addresses = user.addresses || [];

  const saveProfile = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await axios.put('/api/auth/profile', { name: name.trim(), phone });
      updateUser(res.data.user);
      setSaveMsg('Profile updated successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('Failed to update. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const openAddAddress = () => {
    setEditingAddr(null);
    setAddrForm(blankForm);
    setAddrError('');
    setShowAddForm(true);
  };

  const openEditAddress = (addr) => {
    setEditingAddr(addr.id);
    setAddrForm({ fullName: addr.fullName, phone: addr.phone || '', line1: addr.line1, line2: addr.line2 || '', city: addr.city, state: addr.state, pincode: addr.pincode, isDefault: addr.isDefault });
    setAddrError('');
    setShowAddForm(true);
  };

  const saveAddress = async () => {
    if (!addrForm.fullName || !addrForm.line1 || !addrForm.city || !addrForm.state || !addrForm.pincode) {
      setAddrError('Please fill all required fields'); return;
    }
    setAddrSaving(true);
    try {
      let url = '/api/auth/addresses';
      let method = 'post';
      if (editingAddr) { url += `/${editingAddr}`; method = 'put'; }
      await axios[method](url, addrForm);
      const fresh = (await axios.get('/api/auth/me')).data.user;
      updateUser(fresh);
      setShowAddForm(false);
    } catch (err) {
      setAddrError(err.response?.data?.error || 'Failed to save address');
    } finally {
      setAddrSaving(false);
    }
  };

  const deleteAddress = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await axios.delete(`/api/auth/addresses/${id}`);
      const fresh = (await axios.get('/api/auth/me')).data.user;
      updateUser(fresh);
    } catch { alert('Failed to delete address'); }
  };

  const setDefault = async (id) => {
    try {
      await axios.put(`/api/auth/addresses/${id}`, { isDefault: true });
      const fresh = (await axios.get('/api/auth/me')).data.user;
      updateUser(fresh);
    } catch { alert('Failed to set default'); }
  };

  return (
    <>
      <title>My Profile – SimpleCart</title>
      <Header cart={cart} />
      <div className="profile-page">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-sidebar__user">
            <div className="profile-sidebar__avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="profile-sidebar__name">{user.name}</div>
              <div className="profile-sidebar__email">{user.email}</div>
            </div>
          </div>
          <nav className="profile-sidebar__nav">
            {[
              { id: 'profile', label: 'Personal Info', icon: '👤' },
              { id: 'addresses', label: 'My Addresses', icon: '📍' },
              { id: 'orders', label: 'My Orders', icon: '📦', link: '/orders' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`profile-nav-item${activeTab === tab.id ? ' profile-nav-item--active' : ''}`}
                onClick={() => tab.link ? navigate(tab.link) : setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
            <button className="profile-nav-item profile-nav-item--logout" onClick={() => { logout(); navigate('/'); }}>
              <span>🚪</span> Sign Out
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="profile-main">
          {activeTab === 'profile' && (
            <div className="profile-card">
              <h2 className="profile-card__title">Personal Information</h2>
              <p className="profile-card__sub">Update your name and phone number</p>
              {saveMsg && <div className={`profile-msg${saveMsg.includes('success') ? ' profile-msg--success' : ' profile-msg--error'}`}>{saveMsg}</div>}
              <div className="profile-form">
                <div className="profile-form__field">
                  <label>Full Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
                </div>
                <div className="profile-form__field">
                  <label>Email</label>
                  <input value={user.email} disabled className="profile-form__disabled" />
                  <span className="profile-form__hint">Email cannot be changed</span>
                </div>
                <div className="profile-form__field">
                  <label>Phone Number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" />
                </div>
                <button className="profile-save-btn" onClick={saveProfile} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && !showAddForm && (
            <div className="profile-card">
              <div className="profile-card__header">
                <div>
                  <h2 className="profile-card__title">Saved Addresses</h2>
                  <p className="profile-card__sub">{addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved</p>
                </div>
                <button className="profile-add-btn" onClick={openAddAddress}>+ Add Address</button>
              </div>

              {addresses.length === 0 ? (
                <div className="profile-empty">
                  <div className="profile-empty__icon">📍</div>
                  <h3>No saved addresses</h3>
                  <p>Add an address to speed up checkout</p>
                  <button className="profile-add-btn" onClick={openAddAddress}>Add Your First Address</button>
                </div>
              ) : (
                <div className="profile-addr-list">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`profile-addr-card${addr.isDefault ? ' profile-addr-card--default' : ''}`}>
                      <div className="profile-addr-card__top">
                        <div className="profile-addr-name">{addr.fullName} {addr.isDefault && <span className="profile-default-tag">Default</span>}</div>
                        <div className="profile-addr-actions">
                          <button className="profile-addr-action" onClick={() => openEditAddress(addr)}>Edit</button>
                          {!addr.isDefault && <button className="profile-addr-action" onClick={() => setDefault(addr.id)}>Set Default</button>}
                          <button className="profile-addr-action profile-addr-action--delete" onClick={() => deleteAddress(addr.id)}>Delete</button>
                        </div>
                      </div>
                      <div className="profile-addr-text">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</div>
                      <div className="profile-addr-text">{addr.city}, {addr.state} – {addr.pincode}</div>
                      {addr.phone && <div className="profile-addr-text">📞 {addr.phone}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && showAddForm && (
            <div className="profile-card">
              <div className="profile-card__header">
                <div>
                  <h2 className="profile-card__title">{editingAddr ? 'Edit Address' : 'Add New Address'}</h2>
                </div>
                <button className="profile-back-btn" onClick={() => setShowAddForm(false)}>← Back</button>
              </div>
              {addrError && <div className="profile-msg profile-msg--error">{addrError}</div>}
              <div className="profile-form">
                <div className="profile-form__row">
                  <div className="profile-form__field">
                    <label>Full Name *</label>
                    <input value={addrForm.fullName} onChange={e => setAddrForm({...addrForm, fullName: e.target.value})} placeholder="Recipient's full name" />
                  </div>
                  <div className="profile-form__field">
                    <label>Phone</label>
                    <input value={addrForm.phone} onChange={e => setAddrForm({...addrForm, phone: e.target.value})} placeholder="Phone number" />
                  </div>
                </div>
                <div className="profile-form__field">
                  <label>Address Line 1 *</label>
                  <input value={addrForm.line1} onChange={e => setAddrForm({...addrForm, line1: e.target.value})} placeholder="House no., Street, Colony" />
                </div>
                <div className="profile-form__field">
                  <label>Address Line 2</label>
                  <input value={addrForm.line2} onChange={e => setAddrForm({...addrForm, line2: e.target.value})} placeholder="Near landmark, Area (optional)" />
                </div>
                <div className="profile-form__row profile-form__row--3">
                  <div className="profile-form__field">
                    <label>City *</label>
                    <input value={addrForm.city} onChange={e => setAddrForm({...addrForm, city: e.target.value})} placeholder="City" />
                  </div>
                  <div className="profile-form__field">
                    <label>State *</label>
                    <input value={addrForm.state} onChange={e => setAddrForm({...addrForm, state: e.target.value})} placeholder="State" />
                  </div>
                  <div className="profile-form__field">
                    <label>Pincode *</label>
                    <input value={addrForm.pincode} onChange={e => setAddrForm({...addrForm, pincode: e.target.value})} placeholder="6-digit" maxLength={6} />
                  </div>
                </div>
                <label className="profile-form__checkbox">
                  <input type="checkbox" checked={addrForm.isDefault} onChange={e => setAddrForm({...addrForm, isDefault: e.target.checked})} />
                  Set as default delivery address
                </label>
                <div className="profile-form__actions">
                  <button className="profile-cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                  <button className="profile-save-btn" onClick={saveAddress} disabled={addrSaving}>
                    {addrSaving ? 'Saving...' : editingAddr ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
