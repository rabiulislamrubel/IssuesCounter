document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  let status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  totalIssueCount();
  openIssues();
}

const totalIssueCount = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  document.getElementById('total-issue').innerText = issues.length;
}

const openIssues = () => {
  let openIssuesCount = 0;
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  issues.forEach(issue => {
    if(issue.status === 'Open'){
      openIssuesCount += 1;
    }
  });
  document.getElementById('open-issue').innerText = openIssuesCount;
}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let getObj = issues.find(value => value.id == id);
  getObj.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  const getId = document.getElementById(`h3-description-${id}`);
  getId.style.textDecoration = 'line-through';
  openIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  document.getElementById(`ful-div-${id}`).style.display = 'none';
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  totalIssueCount();
  openIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well" id="ful-div-${id}">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id = "h3-description-${id}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                              <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                              </div>`;
  }
}
