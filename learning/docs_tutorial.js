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
    counter: this.state.counter + this.props.increment,
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
//    <button onclick="activateLasers()">
//        Activate Lasers!
///   </button>

// React:
//    <button onClick={activateLasers}>
//        Activate Lasers!
//    </button>

//
//
// When defining a React component, it is common practice for
// an event handler to be a method of the class being created
//    Example: handleClick() below...
class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
}
  
ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);


//
//
// Passing Arguments to Event Handleres
//
//<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
//<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>






//
//
// Ch 7: Conditional Rendering
//       https://reactjs.org/docs/conditional-rendering.html
//
// In React, you will often create a bunch of distinct components that encapsulate
// all the behavior you'll need for a specific app. Then, you'll only render certain
// components at certain times depending on the state of your application.

// Consider the following two components:

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}
  
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

// Then, we can create a 'parent' Greeting(props) that will only display one of
// the above depending on if a user isLoggedIn

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
}
  
ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
);


//
//
// Element Variables
// In React, you can use variables to store any element then use that variable
// to conditionally render certain parts of components
//
// Consider the following login/logout button components:
function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
}
  
function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
}

// Then, depending on the state of isLoggedIn, the below component will either
// render <LoginButton /> or <LogoutButton />
class LoginControl extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    
    }
    
    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {

        let isLoggedIn = this.state.isLoggedIn;
        let button;

        //
        // Right here, the type of "button" is chosen depending on the state of this.state.isLoggedIn
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }
    
    //    
    // The chosen button is then rendered below
    return (
        <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {button} 
        </div>
    );

    }
}

//
//
// Injecting Inline JS If Logic w/ && Operator
//
// Note: unreadMessages.length > 0 && 
//       true && expression (<h2>) = expression
//       false && expression (<h2>) = false
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
}
  
const messages = ['React', 'Re: React', 'Re:Re: React'];
  ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);


//
//
// Injecting Inline JS If-else Logic w/ ? Operator
//
// Note: condition ? true : false
function Mailbox(props) {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
}
// also works with larger expressions being injected
function Mailbox(props) {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn ? (
          <LogoutButton onClick={this.handleLogoutClick} />
        ) : (
          <LoginButton onClick={this.handleLoginClick} />
        )}
      </div>
    );
}




//
//
// Force preventing a component from rendering
//     Note: this works even if this component is being rendered by another component
function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
      <div className="warning">
        Warning!
      </div>
    );
}
  
class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showWarning: true};
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }
  
    handleToggleClick() {
      this.setState(state => ({
        showWarning: !state.showWarning
      }));
    }
  
    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      );
    }
}
  
ReactDOM.render(
    <Page />,
    document.getElementById('root')
);



//
//
//
//
// Ch 8: Lists & Keys
//       https://reactjs.org/docs/lists-and-keys.html
//
//      Note: understanding & being comfortable using Array.map() is ESSENTIAL to this portion of the tutorial
//            It may help to think of map() as similar to comprehensions in Python

//
//
// JS example using map to double an array of integers
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // logs [2, 4, 6, 8, 10]

//
//
// Using map() in React to build collections of elements is very similar
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) => <li>{number}</li>);
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);
//
// identical to the following:
//
const numbers = [1,2,3,4,5];
ReactDOM.render(
    <ul>
        <li>{numbers[0]}</li>
        <li>{numbers[1]}</li>
        <li>{numbers[2]}</li>
        <li>{numbers[3]}</li>
        <li>{numbers[4]}</li>
    </ul>,
    document.getElementById('root')
);


//
//
// Basic List Componenet
//    Usually, you want a component to accept a list as a prop and render that list inside the component
//  Example:
function NumberList(props) {
    let numbers = props.numbers;
    let listItems = numbers.map((number) => <li>{number}</li>);
    return <ul>{listItems}</ul>
}

ReactDOM.render(
    <NumberList numbers={[1,2,3,4,5]} />,
    document.getElementById('root')
)
//
// running the above gives you a warning about the list not having keys for list items!
// it's smart to assign an custom key for each list item inside the map() function
// this allows for proper identification, ordering, and updating of listItems
//      Note: keys only need to be unique among siblings, not globally unique
//   
// See below for simple fix of stringifying each number as it's own key
//      Hopefully, each item will have a 'stable ID' that can be used as a key
//      If not, try to come up with something as shown below
//      If no key is assigned, it will default to using indexes as key which WILL CAUSE ISSUES in more complex renders
//
function NumberList(props) {
    let numbers = props.numbers;
    let listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);
    return <ul>{listItems}</ul>
}

//    Note: keys serve as a 'hint' for React back-end organization but DO NOT get passed to components
//          if you need them to be passed, re-pass them as a different prop as shown below
const content = posts.map((post) =>
    <Post 
        key = {post.id}
        id = {post.id}
        title = {post.title}
    />
);



//
//
// Injecting map() directly into JSX
// 
//    Above, the mapping was done before hand then the finished list was included in the final render/return...
//    In reality, you can inject map() directly into a JSX expression as shown below:
//
// Mapping outside:
function NumberList(props) {
    let numbers = [1, 2, 3, 4, 5];
    let listItems = numbers.map((number) => 
        <ListItem key={number.toString()} value={number} />
    );
    return <ul>{listItems}</ul>
}

// Injecting map():
function NumberList(props) {
    let numbers = [1, 2, 3, 4, 5];
    return (
        <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()} value={number} />    
            )}
        </ul>
    );
}

//
// The above decision should be based on programmer preference but leaning toward readability
// If the map() is very nested, it might be a good idea to "extract the component" to a higher level






//
//
// Ch 9: Forms
//       https://reactjs.org/docs/forms.html
//          Note: forms in React are not exactly fully-fledged
//                for a 'turnkey' solution, check out Formik (https://jaredpalmer.com/formik)
//
//    Consider the following simple HTML form:
//
//  <form>
//    <label>
//      Name:
//      <input type="text" name="name" />
//    </label>
//    <input type="submit" value="Submit" />
//  </form>
//
//    This form has the default HTML form behavior of browsing to a new page when the user submits the form. 
//    If you want this behavior in React, it just works. But in most cases, it’s convenient to have a JavaScript 
//    function that handles the submission of the form and has access to the data that the user entered into the form. 
//    The standard way to achieve this is with a technique called “controlled components”.
//
//
//   Controlled Components:
//       In HTML, form elements can typically maintain their own state which can lead to confusion when using React
//       Instead, use React's state as the 'master state' 
//          Note: controlled components is usually recommended but can become quite tedious in larger applications
//                in which case you can use 'uncontrolled components' --- see https://reactjs.org/docs/uncontrolled-components.html
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}
//
// Since the value attribute is set on our form element, the displayed value will always be this.state.value, making the React state the source of truth. 
// Since handleChange runs on every keystroke to update the React state, the displayed value will update as the user types.
//



//
//
// The textarea HTML tag
//     In HTML, a <textarea> tag defines its text by its children
<textarea>
  Hello there, this is some text in a text area
</textarea>
// 
//     In React, a <textarea> use a value attribute instead:
// 
class EssayForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'Please write an essay about your favorite DOM element.'
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('An essay was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Essay:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}



//
//
// The select HTML tag
//
//    HTML:
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
//
//    React:
//
class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'coconut'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}



//
//
// Handling Multiple Inputs
//
//    When handling multiple inputs, give them each a 'name' attribute then add a conditional to the handler function based on event.target.name
//        Note: the below example uses ES6 'computed property name' syntax to update the state key
class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
}






//
//
//
// Ch 10: Lifting State Up
//        https://reactjs.org/docs/lifting-state-up.html
//
//      Often, several components need to reflect the same data. In this case, it is smart to 
//        'lift up' the data to the closest common ancestor. For example:
