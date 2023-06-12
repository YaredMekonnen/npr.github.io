if (navigator.permissions) {
  navigator.permissions.query({ name: 'contacts' }).then(permissionStatus => {
    if (permissionStatus.state === 'granted') {
      // Permission already granted, access the contacts
      accessContacts();
    } else if (permissionStatus.state === 'prompt') {
      // Request permission from the user
      permissionStatus.onchange = function() {
        if (permissionStatus.state === 'granted') {
          accessContacts();
        } else {
          console.log('Permission denied to access contacts');
        }
      };
      permissionStatus.prompt();
    } else {
      console.log('Permission denied to access contacts');
    }
  });
} else {
  console.log('Web Contacts API is not supported in this browser');
}

function accessContacts() {
  if (navigator.contacts) {
    navigator.contacts.select(['name', 'email']).then(contacts => {
      // Process the retrieved contacts
      for (let contact of contacts) {
        console.log('Name:', contact.name);
        console.log('Email:', contact.email);
      }
    }).catch(error => {
      console.error('Error retrieving contacts:', error);
    });
  } else {
    console.log('Web Contacts API is not supported in this browser');
  }
}
