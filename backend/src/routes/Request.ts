import * as Hapi from "@hapi/hapi";

type Request = {
  created: Date;
  name: string;
  type: string;
  id: string;
  description: string;
  priority: string;
  status: string;
};

const testData: Request[] = [
  {
    created: new Date(600000000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12312356345",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(650000000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12312356346",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(620500000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12312353345",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(610000000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12312356745",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(600500000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12312256345",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(603000000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12212356345",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(600005000000),
    name: "Lorem ipsum",
    type: "Audit",
    id: "12312356344",
    description: "Audit equipment",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(600000000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12312354344",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(650000000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12312354349",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(620500000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12312356340",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(610000000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12312350345",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(600500000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12312356305",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(603000000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12302356345",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  },
  {
    created: new Date(600005000000),
    name: "Lorem ipsum",
    type: "Maintenance",
    id: "12312396340",
    description: "Planned maintenance",
    priority: "High",
    status: "open"
  }
];

const searchRequests: Hapi.ServerRoute = {
  method: "GET",
  path: "/requests",
  handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const searchTerm = request.query.term;
    const requestType = request.query.type;
    const priority = request.query.priority;
    const status = request.query.status;

    /* console.log("Search term: " + searchTerm);
    console.log("Type: " + requestType);
    console.log("Priority: " + priority);
    console.log("Status: " + status);
    console.log("--------------------"); */

    let response = testData;

    if (typeof searchTerm === "string") {
      response = response.filter((request: Request) => {
        return (
          request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (typeof requestType === "string") {
      response = response.filter((request: Request) => {
        return request.type.toLowerCase() === requestType.toLowerCase();
      });
    }

    if (typeof priority === "string") {
      response = response.filter((request: Request) => {
        return request.priority.toLowerCase() === priority.toLowerCase();
      });
    }

    if (typeof status === "string") {
      response = response.filter((request: Request) => {
        return request.status.toLowerCase() === status.toLowerCase();
      });
    }

    return response;
  }
};

type PayloadObject = {
  name: string;
  type: string;
  id: string;
  description: string;
  priority: string;
};

const addRequest: Hapi.ServerRoute = {
  method: "PUT",
  path: "/requests/new",
  handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const payload = <PayloadObject>request.params;

    console.log(payload);

    return h.response().code(200);
  }
};

export { searchRequests };
