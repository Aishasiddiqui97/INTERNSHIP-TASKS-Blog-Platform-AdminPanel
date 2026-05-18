# Logout Button Guide

## Overview
Dashboard me ab logout button 2 jagah available hai - navbar aur sidebar dono me.

## Logout Button Locations

### 1️⃣ Top Navbar (Always Visible)
**Location**: Top-right corner, Admin profile ke paas
**Icon**: 🚪 LogOut icon (red color on hover)
**How to use**:
- Dashboard ke top-right me dekhein
- Admin profile ke baad logout icon dikhega
- Click karne pe immediately logout ho jayega

### 2️⃣ Sidebar (Mobile & Desktop)
**Location**: Sidebar ke bottom me, Dark Mode button ke neeche
**Style**: Red text with logout icon
**How to use**:
- Hamburger menu (☰) click karke sidebar open karein
- Sidebar ke bottom me "Logout" button dikhega
- Click karne pe logout ho jayega

## What Happens on Logout?

```javascript
handleLogout() {
  // 1. Clear authentication token
  localStorage.removeItem('authToken')
  
  // 2. Clear user data
  localStorage.removeItem('user')
  
  // 3. Redirect to login page
  window.location.href = '/admin/login'
}
```

### Steps:
1. ✅ Authentication token clear hota hai
2. ✅ User data localStorage se remove hota hai
3. ✅ Automatically login page pe redirect ho jata hai
4. ✅ Blogs aur categories data safe rehta hai (sirf auth clear hota hai)

## Visual Design

### Navbar Logout Button
```
┌─────────────────────────────────────────┐
│  ☰  Admin Dashboard    🌙  🔔  👤 A  🚪 │
│                                         │
└─────────────────────────────────────────┘
                                      ↑
                                  Logout Icon
```

### Sidebar Logout Button
```
┌──────────────────┐
│  Nexa Blog    ✕  │
├──────────────────┤
│  🏠 Dashboard    │
│  📄 Blogs        │
│  📁 Categories   │
│  👥 Users        │
│                  │
│                  │
├──────────────────┤
│  🌙 Dark Mode    │
│  🚪 Logout       │ ← Red color
└──────────────────┘
```

## Features

### ✅ Dual Location
- Navbar me hamesha visible
- Sidebar me bhi available
- Mobile aur desktop dono me kaam karta hai

### ✅ Visual Feedback
- Hover pe red color highlight
- Icon animation on hover
- Clear visual indication

### ✅ Safe Logout
- Confirmation nahi chahiye (instant logout)
- Auth data clear ho jata hai
- Blogs/categories data safe rehta hai

### ✅ Responsive
- Mobile me sidebar se logout
- Desktop me navbar ya sidebar dono se
- Touch-friendly button size

## Color Scheme

### Navbar Button
- **Default**: Gray icon
- **Hover**: Red icon with light red background
- **Active**: Slightly darker red

### Sidebar Button
- **Default**: Red text (`text-red-400`)
- **Hover**: Lighter red with red background (`hover:bg-red-500/10`)
- **Icon**: LogOut icon from lucide-react

## Testing

### Test Logout Functionality
1. Dashboard open karein
2. Top-right corner me logout icon click karein
3. Check karein:
   - ✅ Login page pe redirect hua
   - ✅ localStorage me authToken nahi hai
   - ✅ Wapas dashboard access nahi ho raha (agar auth check hai)

### Test Sidebar Logout
1. Hamburger menu (☰) click karein
2. Sidebar open hoga
3. Bottom me "Logout" button click karein
4. Same result - login page pe redirect

## Browser Console Check

```javascript
// Before logout
localStorage.getItem('authToken') // "some-token-value"
localStorage.getItem('user') // "user-data"

// After logout
localStorage.getItem('authToken') // null
localStorage.getItem('user') // null

// Blogs data still safe
localStorage.getItem('blogs') // Still available
localStorage.getItem('categories') // Still available
```

## Keyboard Shortcuts (Future)

Possible enhancement:
- `Ctrl + Shift + L` - Quick logout
- `Esc` key to close sidebar
- Tab navigation to logout button

## Security Notes

⚠️ **Important**:
- Logout sirf client-side data clear karta hai
- Server-side session invalidation add karein production me
- JWT tokens ko properly expire karein
- Refresh tokens ko revoke karein

## Troubleshooting

### Problem: Logout button nahi dikh raha
**Solution**:
- Page refresh karein
- Browser cache clear karein
- AdminLayout component properly load ho raha hai check karein

### Problem: Logout ke baad wapas dashboard access ho raha
**Solution**:
- Auth middleware add karein
- Protected routes implement karein
- Login check add karein dashboard pages me

### Problem: Logout button click nahi ho raha
**Solution**:
- Console me errors check karein
- JavaScript enabled hai verify karein
- Button z-index check karein

## Code References

**File**: `components/layouts/AdminLayout.tsx`

**Key Functions**:
```typescript
const handleLogout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  window.location.href = '/admin/login'
}
```

**Navbar Button**:
```tsx
<button onClick={handleLogout}>
  <LogOut className="h-5 w-5" />
</button>
```

**Sidebar Button**:
```tsx
<button onClick={handleLogout}>
  <LogOut className="w-4 h-4 mr-2" />
  Logout
</button>
```
