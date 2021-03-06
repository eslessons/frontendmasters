/* Frontendmasters.com - 
The Good Parts of JavaScript and the Web 

1. Programming Style and your Brain
Start
Finish

2. And Then There Was JavaScript 
Start
Finish

3. Function the Ultimate
Start
Finish

4. The Metamorphosis of Ajax
Start
Finish

5. ES5 - The New Parts
Start
Finish

6. Fun with Functions
Start
Finish

7. Principles of Security
Start
Finish

8. Managing Asynchronicity
Start
Finish

9. The Better Parts
Start
Finish

*/

/* Challenges

 function add(a, b) {
   return a+b;
 }

function sub(a, b) {
  return a-b
}

function mul(a, b) {
  return a*b
}

add(3,4);
sub(3,4);
mul(3,4);

// function identify(x) {
//   return function() {
//     return x;
//   }
// }

// var three = identify(3);
// three();

// function addf(x) {
//   return function(y) {
//     return x+y
//   }
// }

// addf(3)(4)

console.log('liftf')

function liftf(f) {
  return function(x) {
    return function(y) {
      return f(x,y)
    }
  }
}

var addf = liftf(add)

addf(3)(4)
liftf(mul)(5)(6)

console.log('curry')

function curry(f, x) {
  return function(y) {
    return f(x, y)
  }
}

// curry with liftf
// function curry(f, x) {
//   return function(y) {
//     return liftf(f)(x)(y)
//   }
// }

var add3 = curry(add, 3);
add3(4);

curry(mul, 5)(6)

let inc1 = addf(1);
let inc2 = liftf(add)(1);
let inc3 = curry(add, 1)

inc1(5)
inc2(5)
inc3(5)
inc3(inc1(5))

console.log('twice')

function twice(f) {
  return function(x) {
    return f(x, x)
  }
}

var doubl = twice(add);
doubl(11);
var square = twice(mul);
square(11);

console.log('reverse');

function reverse(f) {
  return function(x, y) {
    return f(y, x)
  }
}

var bus = reverse(sub);
bus(3,2)

console.log('composeu');

function composeu(f1, f2) {
  return function(x){
    return f2(f1(x))
  }
}

composeu(doubl, square)(5)

console.log('composeb');

function composeb(f1, f2) {
  return function(x,y,z) {
    return f2(f1(x, y), z)
  }
}

composeb(add, mul)(2,3,7)

function limit(f, n) {
  let z = 0
  return function(x,y) {
    if(z < n) {
      z=z+1
      return f(x,y)
    } else {
      console.log(undefined)
      return undefined
    }
  }
}

var add_ltd = limit(add, 1);
add_ltd(3,4);
add_ltd(3,5);

console.log('from');

function from(x) {
  return function() {
    var next = x
    x += 1;
    return next;
  }
}

var index = from(0);
index();
index();
index();

console.log('to');

function to(f, end) {
  return function(){
    var start = f()
  if(start<end) {
    return start
  } else {
    console.log(undefined)
    return undefined
  }
  }  
}

var indexto = to(from(1), 3);
indexto()
indexto()
indexto()

console.log('fromto');

// function fromTo(start, end) {
//   return function() {
//     if(start < end){
//       return start++
//     } else {
//       console.log('undefined')
//       return undefined;
//     }
//   }
// }

function fromTo(start, end) {
  return to(from(start), end)
}

var index = fromTo(0,3);
index()
index()
index()
index()


console.log('element');

// function element(arr, f) {
//   return function() {
//     return arr[f()]
//   }
// }

function element(arr, f) {
  if(f === undefined) {
    f = fromTo(0, arr.length)
  } 
  return function() {
    var index = f()
    if (index !== undefined) {
      return arr[index]
    }
  }
}

var ele = element(['a', 'b', 'c', 'd'], fromTo(1,3))
ele()
ele()
ele()

var elewithoutf = element(['a', 'b', 'c', 'd'])

elewithoutf()
elewithoutf()
elewithoutf()
elewithoutf()
elewithoutf()





console.log('collect');

function collect(f, arr) {
  return function() {
    let res = f()
    if(res !== undefined) arr.push(res)
    return res
  }    
}

var array = [];
var col = collect(fromTo(0,2), array);
col()
col()
col()
array

console.log('filter');

function filter(gen, filt) {
  // console.log(true)
  return function() {
    var res;
    do {
      res = gen()
    } while (res !== undefined && !filt(res))
      return res
  }
}

var fil = filter(fromTo(0,5), function third(value) {
  return (value%3) === 0
})
fil()
fil()
fil()

console.log('concat');

function concat(f1, f2) {
  let f = f1;
  return function() {
    let v = f();
    if(v !== undefined) {
      return v
    }
    f = f2;
    return f2()
  }
}

var con = concat(fromTo(0,3), fromTo(0,2));
con();
con();
con();
con();
con();
con();

console.log('gensymf');

// function gensymf(letter) {
//   let letters = {}
//   letters.letter = 0
//   return function() {
//     letters.letter++
//     return `${letter}${letters.letter}`
//   }
// }

function gensymf(prefix) {
  var number = 0;
  return function() {
    number += 1;
    return prefix + number;
  }
}

var geng = gensymf("G");
var genh = gensymf("H");

geng();
genh();
geng();
genh();

console.log('gensymff');

function gensymff(unary, seed) {
  return function (prefix) {
    var number = seed;
    return function() {
      number = unary(number);
      return prefix + number;
    }
  }
}

var gensymf1 = gensymff(inc, 0);
var geng = gensymf1("G");
var genh = gensymf1("H");
geng()
genh()
geng()
genh()
console.log('hi')

function fibonaccif(a, b) {
  return function() {
    let ab = a;
    a = b 
    b += ab
    return ab
  }
}

var fib = fibonaccif(0,1);
fib()
fib()
fib()
fib()
fib()
fib()

console.log('counter');

function counter(num) {
    return {
      up: function() {
        return num++
      },
      down: function() {
        return num--;
      }
    }
}

var object = counter(10);
var up = object.up;
var down = object.down;

up()
down()
down()
up()

function add(a,b) {
  return a+b
}

function revocable(f) {
  return {
    invoke: function(first, second) {
      if(f !== undefined) {
        return f(first, second);
      }
    },
    revoke: function() {
      f = undefined;
    }
  }
}

var rev = revocable(add);
var add_rev = rev.invoke;

add_rev(3,4);
rev.revoke();
add_rev(5,7)


console.log('m')
function m(value, source) {
  return {
    value,
    source: (typeof source === 'string') ? source : String(value)
  }
}

JSON.stringify(m(1));
JSON.stringify(m(Math.PI, "pi"));

console.log('addm')
// function addm(source1, source2) {
//   return {
//     value: source1.value + source2.value,
//     source: `(${source1.source}+${source2.source})`
//   }
// }

function addm(source1, source2) {
  return m(source1.value + source2.value, `(${source1.source}+${source2.source})`)
}


JSON.stringify(addm(m(3), m(4)));
JSON.stringify(addm(m(1), m(Math.PI, "pi")))

 function add(a, b) {
   return a+b;
 }

function mul(a, b) {
  return a*b
}

console.log('liftm')
function liftm(f, sign) {
  return function(source1, source2) {
    return m(f(source1.value, source2.value), `(${source1.source}${sign}${source2.source})`)
  }
}

JSON.stringify(addm(m(3), m(4)));
JSON.stringify(liftm(mul, "*")(m(3), m(4)))

console.log('liftm2')
function liftm2(f, sign) {
  return function(source1, source2) {
    if(typeof source1 === 'number') {
      source1 = m(source1);
    }
    if(typeof source2 === 'number') {
      source2 = m(source2);
    }
    return m(f(source1.value, source2.value), `(${source1.source}${sign}${source2.source})`)
  }
}

var addm = liftm2(add, "+");
JSON.stringify(addm(3,4));


function exp(arr) {
  return Array.isArray(arr) ? arr[0](arr[1], arr[2]) : arr
}

var sae = [mul, 5, 11];
exp(sae);
exp(42);

console.log('exp nested')

function expn(param) {
  return Array.isArray(param) ? 
    param[0](expn(param[1]), expn(param[2])) :
    param
}

var nae = [Math.sqrt, [add, [square, 3], [square, 4]]]
expn(nae)

console.log('addg');

function addg(x) {
  function more(y) {
    if (y===undefined) {
      return x;
    }
    x += y;
    return more;
  }
  if (x !== undefined) {
    return more
  }
}



addg()
addg(2)()
addg(2)(7)()
addg(3)(0)(4)()
addg(1)(2)(4)(8)()
  
function liftg(binary) {
  return function(first) {
    if(first === undefined) {
      return first;
    }
    return function more(next) {
      if (next === undefined) {
        return first;
      }
      first = binary(first, next);
      return more;
    }
}

liftg(mul)();
liftg(mul)(3)()
liftg(mul)(3)(0)(4)()
liftg(mul)(1)(2)(4)(8)()

function arrayg(first) {
  var array = [];
  function more(next) {
    if(next === undefined) {
      return array;
    }
    array.push(next);
    return more;
  }
  return more(first);
}

arrayg()
arrayg(3)()
arrayg(3)(4)(5)()

// ++++++++++++++++++++++++++++++++++++

function continuize(unary) {
  return function (callback, arg) {
    return callback(unary(arg))
  }
}

// function continuize(any) {
//   return function (callback, ...x) {
//     return callback(any(...x))
//   }
// }

var sqrtc = continuize(Math.sqrt);
sqrtc(console.log, 81)


*/





