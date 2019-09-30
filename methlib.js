/*
 * Original Author: Ben Love
 * Last Editor: Ben Love
 * Last Edited: 30/09/19
 * Purpose: To store any and all helper functions you could need
 * See the README for styling rules
 */

//Roman Numerals Characters
const romChars = ['I', 'V', 'X', 'L', 'D', 'C', 'M', 'v', 'x', 'l', 'd', 'c', 'm'];
//Their corresponding values
const romVals = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];

//Constants
const E = 2.7182818;
const PI = 3.1415926;
const PHI = 1.6180339;

let maxVal = romVals[romVals.length - 1] * 3;
for (let i = 0; i < romVals.length / 2; i++) {
    maxVal += romVals[i * 2 + 1];
}

const MRV = maxVal;

//Turns a passed in time (in seconds) into a formatted string with days, hours, minutes, and seconds
function prettyTime(time) {
    let seconds = time;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let out_string = ""

    if (days == 1) {
        out_string += str(days) + "day, ";
    } else if (days > 0) {
        out_string += str(days) + " days, ";
    }

    if (hours == 1) {
        out_string += str(hours % 24) + " hour, ";
    } else if (hours > 0) {
        out_string += str(hours % 24) + " hours, ";
    }

    if (minutes == 1) {
        out_string += str(minutes % 60) + " minute, ";
    } else if (minutes > 0) {
        out_string += str(minutes % 60) + " minutes, ";
    }

    if (seconds == 1) {
        out_string += str(seconds % 60) + " second";
    } else if (seconds > 0) {
        out_string += str(seconds % 60) + " seconds";
    }

    return out_string;
}

//Return the logarithm of a number with an arbitrary base
function logb(number, base) {
    return (Math.log(number) / Math.log(base));
}

//Generate an MLA Citation
function MLA_Citation(quote, act, scene, lineStart, lineEnd) {
    let modQuote = null;

    if (lineEnd - lineStart < 2) {
        modQuote = quote;
    } else {
        let quoteWords = quote.split(" ");
        modQuote = quoteWords[0] + " " + quoteWords[1] + " ... " + quoteWords[quoteWords.length - 2] + " " + quoteWords[quoteWords.length - 1];
    }

    return "'" + modQuote + "' (" + romanNumerals(act) + ", " + scene + ", " + lineStart + "-" + lineEnd + ")";
}

//Generate the Roman numeral equivalent of a given number
function romanNumerals(number) {
    let romanNum = "";
    let tenthPower = Math.ceil(logb(number, 10)) + 1;

    if (number > MRV) {
        return ("Error: Number too Large");
    } else {
        for (let i = tenthPower; i > 0; i--) {
            let workingString = "";
            let operatingNum = Math.floor(number / Math.pow(10, i - 1));
            operatingNum -= Math.floor(number / Math.pow(10, i)) * 10;

            //check which of 4 general categories the digit is in: 1-3, 4, 5-8, 9 (there is probably a much better way to do this)
            if (operatingNum < 4) {
                for (let j = 0; j < operatingNum; j++) {
                    workingString += romChars[(i - 1) * 2];
                }
            } else if (operatingNum == 4) {
                workingString = romChars[(i - 1) * 2] + romChars[(i - 1) * 2 + 1];
            } else if (operatingNum == 5) {
                workingString = romChars[(i - 1) * 2 + 1];
            } else if (operatingNum == 9) {
                workingString = romChars[(i - 1) * 2] + romChars[i * 2];
            } else {
                workingString = romChars[(i - 1) * 2 + 1];
                for (let j = 0; j < operatingNum - 5; j++) {
                    workingString += romChars[(i - 1) * 2];
                }
            }
            romanNum += workingString;
        }
        return romanNum;
    }
}

//Roman numeral tester
function romNumTest() {
    for (let i = 1; i < 101; i++) {
        console.log(i + " : " + romanNumerals(i) + " ");
        if (i % 10 == 0) {
            console.log("");
        }
    }
}

//Return all numbers that are less than n and are coprime to it
function findCoprimesLessThan(n) {
    let coprimes = [];

    for (let i = 0; i < n; i++) {
        if (gcd(i, n) == 1) {
            coprimes.push(checkNum);
        }
    }

    return coprimes;
}

//Return an array of numbers coprime to n of length len
function findCoprimeList(n, len) {
    let coprimes = [];
    let checkNum = 1;

    while (coprimes.length < len) {
        if (gcd(checkNum, n) == 1) {
            coprimes.push(checkNum);
        }
        checkNum++;
    }

    return coprimes;
}

//Return the greatest common denominator
function gcd(a, b) {
    let gcd = 0;
    let exit = false;

    while (!exit) {
        if (a > b) {
            a -= b;
        } else if (b > a) {
            b -= a;
        } else {
            gcd = a;
            exit = true;
        }
    }
    return gcd;
}

//Return the lowest common multiple
function lcm(a, b) {
    return Math.abs((a * b) / gcd(a, b));
}

//Brute force prime checker
function isPrime(n) {
    for (let i = 2; i < Math.sqrt(n); i++) {
        if (isPrime(i)) {
            if (gcd(i, n) != 1) {
                return false;
            }
        }
    }
    return true;
}

//More efficient use of ^ and % together by using the modulus throughout the power-ing
function modPow(b, e, m) {
    let modPow = 1;

    for (let i = 0; i < e; i++) {
        modPow *= b;
        modPow %= m;
    }

    return modPow;
}

//RSA encryption
function RSAEncrypt(message, n, k) {
    let BEM = [];
    let CA = message.split("");
    for (let i = 0; i < CA.length; i++) {
        let NC = parseInt(CA[i]);
        BEM[i] = modPow(NC, k, n);
    }
    return BEM;
}

//RSA decryption
function RSADecrypt(ENCMess, n, j) {
    let message = "";
    for (let i = 0; i < ENCMess.length; i++) {
        let NC = modPow(ENCMess[i], j, n);
        message += NC.toString();
    }
    return message;
}

//Extended Euclid function (???????)
function extendedEuclid(a, b) {
    let s = 0;
    let old_s = 1;
    let t = 1;
    let old_t = 0;
    let r = b;
    let old_r = a;
    let quot = 0;
    let temp = 0;

    while (r != 0) {
        quot = old_r / r;

        temp = r;
        r = old_r - quot * temp;
        old_r = temp;
        temp = s;
        s = old_s - quot * temp;
        old_s = temp;
        temp = t;
        t = old_t - quot * temp;
        old_t = temp;
    }

    return old_s;
}

//No idea
function eTot(n) {
    let numCoprimes = 0;

    for (let i = 0; i < n; i++) {
        if (gcd(i, n) == 1) {
            numCoprimes++;
        }
    }

    return numCoprimes;
}

//Return the Carmicheal function of a number
//TODO: Figure out what the fuck is happening with this and why it just doesn't work sometimes
function carmichael(n) {
    let m = 0;
    let coprimes = findCoprimesLessThan(n);
    while (m < n * 10) {
        m++;
        let success = true;
        for (let a of coprimes) {
            if (Math.pow(a, m) % n != 1) {
                success = false;
                break;
            }
        }
        if (!success) {
            continue;
        } else {
            return m;
        }
    }
}

//Return a truncated version of a value between the lower and upper limits
function limit(limitee, lowerLimit = -1, upperLimit = 1) {
    if (limitee < lowerLimit) {
        return lowerLimit;
    }
    if (limitee > upperLimit) {
        return upperLimit;
    }
    return limitee;
}

//Return a boolean of whether or not a given value would be truncated with the given lower and upper limits
function isLimited(limitee, lowerLimit = -1, upperLimit = 1) {
    return (limitee < lowerLimit || limitee > upperLimit);
}

//Return a truncated version of a vector given a lower and upper limit as vectors which form a rectangle that we truncate it into
function vectorLimit(limitee, lowerLimit = new Vector2(-1, -1), upperLimit = new Vector2(1, 1)) {
    limitee.x = limit(limitee.x, lowerLimit.x, upperLimit.x);
    limitee.y = limit(limitee.y, lowerLimit.y, upperLimit.y);
    return limitee;
}

//Return a boolean of whether or not a given vector would be truncated with the given lower and upper limits
function isVectorLimited(limitee, lowerLimit = new Vector2(-1, -1), upperLimit = new Vector2(1, 1)) {
    return (isLimited(limitee.x, lowerLimit.x, upperLimit.x) || isLimited(limitee.y, lowerLimit.y, upperLimit.y));
}

//Check if a point overlaps a rectangle
function pointOverlap(p, r) {
    return (p.x > r.pos.x && p.x < r.pos.x + r.size.x && p.y < r.pos.y + r.size.y && p.y > r.pos.y);
}

//Check if two rectangles overlap
function overlap(a, b) {
    return !(a.pos.x > b.pos.x + b.size.x || a.pos.x + a.size.x < b.pos.x || a.pos.y > b.pos.y + b.size.x || a.pos.y + a.size.y < b.pos.y);
}

//Convert a color in HSV format to RGB format
function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;

    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 256),
        g: Math.round(g * 256),
        b: Math.round(b * 256)
    };
}

//Return a random value between the maximum and minimum value
function random(a = 0, b = 1) {
    let max = arguments.length === 1 ? a : b;
    let min = arguments.length === 1 ? 0 : a;
    return (Math.random() * (max - min)) + min;
}

//Returns the string of the corresponding font size because css is stupid and doesn't let you just pass in a number for font size
function selectFontSize(size) {
    let sizeString = "";
    switch (size) {
        case 0: sizeString = "xx-small"; break;
        case 1: sizeString = "x-small"; break;
        case 2: sizeString = "small"; break;
        case 3: sizeString = "medium"; break;
        case 4: sizeString = "large"; break;
        case 5: sizeString = "x-large"; break;
        case 6: sizeString = "xx-large"; break;
    }
    return sizeString;
}

//Helper class for 2D vectors
function Vector2(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    //Add another vector to this one and return the result
    this.add = function (addend) {
        this.x += addend.x;
        this.y += addend.y;
        return this;
    }

    //Subtract another vector from this one and return the result
    this.sub = function (subtrahend) {
        this.x -= subtrahend.x;
        this.y -= subtrahend.y;
        return this;
    }

    //Scale this vector by a number and return the result
    this.scale = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    //Return the length of this vector according to c^2 = a^2 + b^2
    this.length = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    //Normalize this vector (scale it so it's length is 1) and return the result
    this.normalize = function () {
        this.scale(1 / this.length());
        return this;
    }

    //Limit this vector to a rectangle defined by the lower and upper limits forming the corners and return the result
    this.limit = function (lowerLimit = new Vector2(-1, -1), upperLimit = new Vector2(1, 1)) {
        return vectorLimit(this, lowerLimit, upperLimit);
    }
}

//Helper class for a rectangular 2D collider
function Collider(x = 0, y = 0, w = 20, h = 20) {
    this.pos = new Vector2(x, y);
    this.size = new Vector2(w, h);
    this.vel = new Vector2();
    this.acc = new Vector2();

    this.wallLimit = function (bounds) {
        if (isLimited(this.pos.x, 0, bounds.x)) {
            this.vel.x = 0;
        }
        if (isLimited(this.pos.y, 0, bounds.y)) {
            this.vel.y = 0;
        }
        this.pos.limit({ x: 0, y: 0 }, bounds.sub(this.size));
    }

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.scale(0);
        this.vel.scale(0.9);
    }
}

//Helper class for an arbitrary button
function Button(onClick, x = 0, y = 0, w = 100, h = 100) {
    this.onClick = onClick;
    this.pos = new Vector2(x, y);
    this.size = new Vector2(w, h);

    this.wasClicked = function (clickPos) {
        return pointOverlap(clickPos, this)
    }
}