function myFunction(randomNum) {
    if (randomNum < 0.5) {
        //console.log("Error!");
        throw new Error("randomNum kleiner als 0.5");
    }
    return "Result: " + randomNum;
}

for (let i = 0; i < 15; i++) {
    let randomNum = Math.random();
    console.log(`I ist momentan ${i}`);
    try {
        console.log(myFunction(randomNum));
    } catch (error) {
        console.error("Exception: " + error.message);
    }
}
