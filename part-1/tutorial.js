/* Asynchronous JavaScript */

/* Example of Synchronous Programming */
const name1 = "Pochacco";
const greeting = `Howdy, my name is ${name1}!`;
console.log(greeting);

/* Synchronous with function */
function sweetGreeting(name) {
    return `Howdy, my name is ${name}!!!`;
}
console.log(sweetGreeting(name1));


/* Example of a long running synchronous function (paired with HTML) */
/* const MaxPrime = 1000000;
function isPrimeNumber(n) {
    for (let i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return n > 1;
}
const random = (max) => Math.floor(Math.random() * max);

function generatePrimeNumbers(quota) {
    const primes = [];
    while (primes.length < quota) {
        const candidate = random(MaxPrime);
        if (isPrimeNumber(candidate)) {
            primes.push(candidate);
        }
    }
    return primes;
}
const quota = document.querySelector("#quota");
const output = document.querySelector("#output");

document.querySelector("#generate").addEventListener("click", () => {
    const primeValues = generatePrimeNumbers(quota.value);
    output.textContent = `The prime values have been generated: ${quota.value}`
});

document.querySelector("#reload").addEventListener("click", () => {
    document.location.reload();
});
*/

/* The lesson we take away */
// JS is single threaded --> program follows a sequence
/* Here is Why Asynchronous JS is useful: 
    Start a long-running operation by calling a function.
    Have that function start the operation and return immediately, so that our program can still be responsive to other events.
    Have the function execute the operation in a way that does not block the main thread, for example by starting a new thread.
    Notify us with the result of the operation when it eventually completes.
*/


/* Event Handler Example: a form of asynchronous programming*/
const eventLog = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
    eventLog.textContent = ""; // Setting text content for event log as empty String

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("loadend", () => {
        eventLog.textContent = `${eventLog.textContent}Finished with status: ${xhr.status}`;
    });

    xhr.open(
        "GET",
        "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
    );
    xhr.send();
    eventLog.textContent = `${eventLog.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
    eventLog.textContent = ""; // Resetting text content
    document.location.reload(); // Reloading document
});

/* Callbacks Example*/
// "An event handler is a particular type of callback"
/* Here is the first example WITHOUT using callbacks and asynchronous*/
function step1(init) {
    return init + 1;
}
function step2(init) {
    return init + 2;
}
function step3(init) {
    return init + 3;
}
function executeOperation() {
    let result = 0;
    result = step1(result);
    result = step2(result);
    result = step3(result);
    console.log(`result: ${result}`);
}
executeOperation();  

/* The same as above, but using callbacks */
