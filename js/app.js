const notif = (title, body, icon) => { // Icons don't properly work, they just take the icon of the app
  window.Notification?"granted"===Notification.permission?serviceWorkerRegistration.showNotification(title,{body:body,icon:icon}):Notification.requestPermission().then(function(o){"granted"===o?serviceWorkerRegistration.showNotification(title,{body:body,icon:icon}):console.log("User blocked notifications.")}).catch(function(o){console.error(o)}):console.log("Browser does not support notifications.");
}

document.querySelector('#notif').onclick = () => {
  notif('Title', 'Body', '');
});

if (localStorage.getItem('data')) {
  document.querySelector('#dis').innerText = localStorage.getItem('data');
} else {
  document.querySelector('#dis').innerText =  'None';
}

document.querySelector('#b1').onclick = () => {
  localStorage.setItem('data', 1);
}

document.querySelector('#b2').onclick = () => {
  localStorage.setItem('data', 2);
}

document.querySelector('#b3').onclick = () => {
  localStorage.setItem('data', 3);
}

document.querySelector('#cls').onclick = () => {
  localStorage.setItem('data', undefined);
}
