const tabs1 = new GraphTabs('tab', {
  isChanged: (tabs) => {
    console.log(tabs);
  }
});

const tabs3 = new GraphTabs('tab3', {
  isChanged: (tabs) => {
    console.log(tabs);
  }
});

tabs1.switchTabs(document.querySelector('#tab3'));
tabs3.switchTabs(document.querySelector('#tab32'));