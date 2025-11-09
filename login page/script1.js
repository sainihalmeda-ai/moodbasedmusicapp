// Set background
const customBg = document.getElementById('customBg');
const defaultBgUrl = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
customBg.style.backgroundImage = `url(${defaultBgUrl})`;

// ✅ ENFORCE LOGIN FORM ON PAGE LOAD (e.g., from "Get Access")
if (document.getElementById('main-auth')) {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signupForm').classList.add('hidden');
}

// ✅ UPDATED: Sign Up with falling animation (from top to bottom)
document.getElementById('showSignupLink').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').classList.add('hidden');
  const signupForm = document.getElementById('signupForm');
  signupForm.classList.remove('hidden');

  // Collect animatable elements in order (top to bottom)
  const elements = [
    signupForm.querySelector('.hi-text'),
    ...signupForm.querySelectorAll('.form-group'),
    signupForm.querySelector('button[type="submit"]'),
    signupForm.querySelector('.divider'),
    ...signupForm.querySelectorAll('.social-btn'),
    signupForm.querySelector('.switch-link')
  ].filter(el => el); // remove nulls

  // Apply falling animation with staggered delay
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100); // 100ms delay between each
  });
});

// Switch back to login (no animation)
document.getElementById('showLoginLink').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
});

// Password validation for signup
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const passwordRules = document.getElementById('passwordRules');
const ruleLength = document.getElementById('ruleLength');
const ruleUpper = document.getElementById('ruleUpper');
const ruleNumber = document.getElementById('ruleNumber');
const ruleSpecial = document.getElementById('ruleSpecial');

const rules = {
  length: /.{8,}/,
  upper: /[A-Z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
};

signupPassword.addEventListener('input', () => {
  const value = signupPassword.value;
  passwordRules.classList.add('show');
  ruleLength.className = rules.length.test(value) ? 'rule valid' : 'rule invalid';
  ruleUpper.className = rules.upper.test(value) ? 'rule valid' : 'rule invalid';
  ruleNumber.className = rules.number.test(value) ? 'rule valid' : 'rule invalid';
  ruleSpecial.className = rules.special.test(value) ? 'rule valid' : 'rule invalid';

  if (confirmPassword.value) validateConfirmPassword();
});

confirmPassword.addEventListener('input', validateConfirmPassword);

function validateConfirmPassword() {
  const pass = signupPassword.value;
  const conf = confirmPassword.value;
  const isValid = pass === conf && pass !== '';
  confirmPassword.style.borderColor = isValid ? '#4caf50' : '#f44336';
}

// Login form submit
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  if (email && password) {
    alert('Logged in successfully!');
  }
});

// Signup form submit
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const pass = signupPassword.value;
  const conf = confirmPassword.value;

  if (!rules.length.test(pass) || !rules.upper.test(pass) || 
      !rules.number.test(pass) || !rules.special.test(pass)) {
    alert('Please meet all password requirements.');
    return;
  }

  if (pass !== conf) {
    alert('Passwords do not match.');
    return;
  }

  alert('Account created successfully!');
});

// Social login handlers (demo only)
['googleLogin', 'facebookLogin', 'appleLogin', 'googleSignup', 'facebookSignup', 'appleSignup'].forEach(id => {
  document.getElementById(id).addEventListener('click', (e) => {
    e.preventDefault();
    const provider = id.includes('google') ? 'Google' : id.includes('facebook') ? 'Facebook' : 'Apple';
    const action = id.includes('Login') ? 'logged in' : 'signed up';
    alert(`In a real app, you would ${action} with ${provider}.`);
  });
});

// Background customization
const bgUrlInput = document.getElementById('bgUrl');
const applyBtn = document.getElementById('applyBg');
const resetBtn = document.getElementById('resetBg');

applyBtn.addEventListener('click', () => {
  const url = bgUrlInput.value.trim();
  if (url) {
    customBg.style.backgroundImage = `url(${url})`;
    bgUrlInput.value = '';
  }
});

resetBtn.addEventListener('click', () => {
  customBg.style.backgroundImage = `url(${defaultBgUrl})`;
});