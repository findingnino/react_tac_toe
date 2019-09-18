import React from 'react';
import ReactDOM from 'react-dom';

//
//
//
// Ch 1: Hello World!
//       https://reactjs.org/docs/hello-world.html
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);


//
// Ch 2: Introducing JSX 
//       https://reactjs.org/docs/introducing-jsx.html
//
// JSX variable declaration
// JSX is a syntax extension to JS
//     Useful for describing what a UI should look like
//       often depending on certain 'props' or 'state'
//     JSX produces React 'elements' that can be dynamically
//       rendered to the DOM
const element = <h1>Hello, world!</h1>;




//
//
//
// Injecting JS variables into JSX then rendering to the DOM
//      Use {} to inject any valid JS into any JSX expression
let name = 'Josh Perez';
let element = <h1> Hello, {name}</h1>
ReactDOM.render(
    element,
    document.getElementById('root')
);




//
//
//
// Injecting JS function calls into JSX
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

let user = {
    firstName: 'Nino',
    lastName: 'G',
    avatarUrl: 'https://www.url.com/avatar'
};

const element = (
    <h1>
        Hello, {formatName(user)}
    </h1>
);

ReactDOM.render(
    element,
    document.getElementById('root')
);




//
//
//
// Using JSX inside regular JS loops
//    Note: you can use JSX inside JS-loops but
//          you can't use JS-loops inside JSX
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, stranger...</h1>;
}



//
//
//
// Specifying JSX attributes
//      Note: JSX user JS's camelCase over HTML's style therefore
//            class becomes className and
//            tabindex becomes tabIndex
let element = <div tabIndex="0"></div>
let element = <img src={user.avatarUrl}></img>
let element = <h1 class='sandwich'></h1>




//
//
//
// Specifying Children w/ JSX
//      Note: JSX elements MUST have 1 and only 1 'outer shell'
let element = (
    <div>
        <h1>Hello, {user.firstName}!</h1>
        <img src={user.avatarUrl} />
        <h3> Good to see you 'round these parts...</h3>
    </div>
);




//
//
//
// JSX automatically prevents injection attacks
let title = 'potentially malicious user input / api response'
let element = <h2>{title}</h2> //totally safe




//
//
//
// JSX is just a shortcut to React.createElement()
let element = (
    <h1 className='greeting'>
        Hello, World!
    </h1>
);

let element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, World!'
);

let element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, World!'
    }
};




// Ch 3: Rendering JSX Elements 
//       https://reactjs.org/docs/rendering-elements.html
//
// Elements are the smallest building blocks of React apps
//     Note: don't confuse elements with the more widely used components
//           Elements are what "components" are made up of             
let element = <h1>Hello, world!</h1>;


//
//
// Rendering an Element into the DOM
// let's say there is a <div> somewhere in your HTML
<div id='root'></div>

// use ReactDOM.render(JSX element/component, HTML location)
ReactDOM.render(
    element,
    document.getElementById('root')
);


//
//
// Updating a Rendered Element Dynamically
//     Note: this is a very rudimentary example
//           In practice, most React apps only call ReactDOM.render()
//             once & uses 'stateful components' instead
function tick() {
    let element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It's now {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);


//
//
// Ch 4: Components & Props
//       https://reactjs.org/docs/components-and-props.html
//

//
// Function & Class Components
//     Note: the below function / call definitions are
//             equivalent from React's point of view
//     Note: all Components must be Capitalized, otherwise
//           they will be treated as HTML tags by mistake!
function Welcome(props) {
    return <h1>
        Hello, {props.name}
    </h1>;
}

class Welcome extends React.Component {
    render() {
        return <h1>
            Hello, {this.props.name}
        </h1>;
    }
}

//
//
// Rendering a Component
//
let element = <Welcome name='Nino'/>
ReactDOM.render(
    element,
    document.getElementById('root')
);


//
//
// Composing a Component
//     Components can refer to other
//     components in their render() output
function Welcome(props) {
    return <h2>Hello, {props.name}</h2>;
}

function App() {
    return (
        <div>
            <Welcome name='Nino'/>
            <Welcome name='Tiff'/>
            <Welcome name='Bean-o'/>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


//
//
// Extracting Components
//     Don't be afraid to split components up into
//     smaller components as they grow too large
//
//    Consider the following Comment component:
function Comment(props) {
    return (
        <div className="Comment">
          <div className="UserInfo">
            <img className="Avatar"
              src={props.author.avatarUrl}
              alt={props.author.name}
            />
            <div className="UserInfo-name">
              {props.author.name}
            </div>
          </div>
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
    );
}
// it accepts auther (object)
//            text (string)
//            date (date)
// as props to describe a 'comment'
//
// but maybe...
// it can be broken down into:
//     Avatar -->
//     UserInfo -->
//     Comment
function Avatar(props) {
    return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
  
    );
}

function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>
    );
}

function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
}


//
//
// Props are Read-Only!
//     All components (whether function or class) must
//       NEVER modify its own props!
//
// this is allowed
function sum(a, b) {
    return a + b;
}
//
// NOT ALLOWED
function withdraw(account, amount) {
    account.total -= amount;
}

//
//
// Ch 5: State & Lifecycle
//       https://reactjs.org/docs/state-and-lifecycle.html
//
class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock/>,
    document.getElementById('root')
);


//
//
// Adding Lifecycle Methods to a Class
class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

// Wrong
//   This will not automatically call render()
this.state.comment = 'Hello'
// Correct
this.setState({comment:'Hello'});

// Wrong
//   State/prop updates are sometimes done asynchronously so 
//   state & prop cannot rely on each other
this.setState({
    counter: this.state.counter + this.props.increment;
});
// Correct
//   Instead do the following:
this.setState((state, props) => ({
    counter: state.counter + props.increment
}));
// Also, correct
//    Same as above w/o arrow notation function
this.setState(function(state,props) {
    return {
        counter: state.counter + props.increment
    };
});



//
//
// Ch 6: Handling Events
//       https://reactjs.org/docs/handling-events.html
//
//   Note: React events use camelCase, rather than lowercase like HTML
//       Consider the following:
//
// HTML:
<button onclick="activateLasers()">
    Activate Lasers!
</button>

// React:
<button onClick={activateLasers}>
    Activate Lasers!
</button>

