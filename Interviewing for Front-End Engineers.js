/* Frontendmasters.com -
Interviewing for Front-End Engineers

1. Introduction
Start
Finish

2. Application
Start
Finish

3. Initial Call
Start
Finish

4. Code Test
Start
Finish

5. Phone Screen
Start
Finish

6. On-site Interview & Concept Review
Start
Finish

7. On-site Interview Example Questions
Start
Finish

8. Wrapping Up
Start
Finish

------- promisify -------

function promisify(fn) {
	return function(...args) {
		return new Promise(function(resolve, reject){
			function cb(result) {
				resolve(result)
			}
			fn.apply(this, args.concat(cb))
		})
	}
}

*/