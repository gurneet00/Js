const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
let arr=[]
arr.push(promise1)
arr.push(promise2)
console.log(arr)
Promise.all(arr).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]
