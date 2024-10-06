/* How to use promises */
/* Includes my notes, definitions, the provided sample code I tested in the web browser console, and comments on notable lines*/

// Goal: Understanding how to use promises in JavaScript

/* Using the fetch API */
// We pasted this code into the web console
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
});

console.log("Started request…"); // Note: "Unlike a synchronous function, fetch() returns while the request is still going on"


/* Practicing on how to Chain Promises */
// Note: "... once you get a Response object, you need to call another function to get the response data" and "...json() is also asynchronous"
// We pasted this code into the web console
const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise2.then((response) => {
    const jsonPromise = response.json(); // Note: "...call the json() method of the Response object"
    // Note: The .json() method "...takes a Response stream and reads it to completion"
    jsonPromise.then((data) => {
        console.log(data[0].name); // Note: placing a callback within a callback will create an excessive level of nested-ness within the code: i.e. callback hell!!!
    });
});

/* Learning how to AVOID "callback hell" by utilizing .then() method*/
// Note: "... then() itself returns a promise, which will be completed with the result of the function passed to it."
const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise3 // Note: Unlike before, we do not have to create constants
    .then((response) => response.json()) // Note: we can begin chaining instead of nesting
    .then((data) => {
        console.log(data[0].name);
    });

/* Practicing throwing an error when the response isn't "OK" */
/* Note: Here, notice the if statements within the first .then() method on the response object */
/* Note: ok is a read-only property that ""... contains a Boolean stating whether the response was successful (status in the range 200-299) or not" */
const fetchPromise4 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise4
    .then((response) => {
        if (!response.ok) { // Checking if the response is not ok using the ok property
            throw new Error(`HTTP error: ${response.status}`); // Printing the status
        }
        return response.json(); // Else, proceeding normal operations with the response object
    })
    .then((data) => {
        console.log(data[0].name);
    });


/* Practicing Catching errors */
// Note: "Promise objects provide a catch() method" AND "the handler passed to catch() is called when the asynchronous operation fails"
const fetchPromise5 = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise5
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data[0].name);
    })
    .catch((error) => { // Note: we add the .catch() method to the end of the promise chain
        console.error(`Could not get products: ${error}`);
    });
// As expected, the web console returned to me "VM26:16 Could not get products: TypeError: Failed to fetch"
// The error was logged by our catch() handler.


/* Promise Terminology */
/* There are 3 states of promises */
/* Pending: "the promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet. This is the state your promise is in when it's returned from a call to fetch(), and the request is still being made." */
/* Fulfilled: "the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called." */
/* Rejected: "the asynchronous function has failed. When a promise is rejected, its catch() handler is called." */


/* "Succeeded" and "Failed" */
// The API will often determine if the definition of "succeeded" or "failed"
/* Consider this: "fetch() rejects the returned promise if (among other reasons) a network error prevented the request being sent, but fulfills the promise if the server sent a response, even if the response was an error like 404 Not Found." */
// As such can occur, the terms "settled" can cover both "fulfilled" or "rejected"
// Resolved: meaning settled OR if the promise has been "locked in" to "follow the state of another promise"



/* Practicing Combining Multiple Promises*/
// When you have multiple promises that don't depend on each other and must be fulfilled, we use the Promise.all() Method.
// Note: the Promise.all() method shows the general promise as fulfilled "when and if all the promises in the array are fulfilled"

const fetchPromise6 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise7 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise8 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise6, fetchPromise7, fetchPromise8])
    .then((responses) => {
        for (const response of responses) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
    }); // The catch() handler is only called with the error that is thrown alongside the promise that was rejected


/* Async and Await */
// Note: the async keyword declares an asynchronous function AND async functions always return a promise!!!!
async function myFunction() {
    console.log("This is an asynchronous function");
}

/* Inside of an async function, we can use the "await keyword before a call to a function that returns a promise" */
// Note: In essence, the code is then forced to wait "at that point until the promise is settled" --> Next, the "fulfilled value of the promise" is "treated as the return value" OR the "rejected value is thrown"

// We pasted this code into the web browser console
/* What we can learn from here is that instead of getting a promise, we can utilize calling await fetch() --> the caller receives back a "fully complete response object" as if it were a synchronous function */
async function fetchProducts() {
    try {
        // after this line, our function will wait for the `fetch()` call to be settled
        // the `fetch()` call will either return a Response or throw an error
        const response = await fetch(
            "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        // after this line, our function will wait for the `response.json()` call to be settled
        // the `response.json()` call will either return the parsed JSON object or throw an error
        const data = await response.json();
        console.log(data[0].name); // This returns baked beans, as expected
    } catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}

fetchProducts();

// Note: below is another way of writing the catch error method, but utilizing the .then()
/* async function fetchProducts() {
    const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

const promise = fetchProducts();
promise
    .then((data) => {
        console.log(data[0].name);
    })
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    });
*/


/* Extra Note: There is a try... catch block for error handling --> this behaves exactly as if the code were synchronous */

// Another thing to note: we can "only use await inside an async function, unless your code is in a JavaScript module"
// In addition: Similarly to a promise chain, "await forces asynchronous operations to be completed in series"