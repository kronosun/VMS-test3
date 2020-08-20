function zeroPad(numberStr) {
    return ("0" + numberStr).slice(-2);
  }
  
const time = "02:00:00"
const formattedtime= `${zeroPad(Number(time.substring(0,2))+4)}:${time.substring(3,8)}`;
const format = `${((new Date(Date.now())).getFullYear())}-${zeroPad((new Date(Date.now())).getMonth())}-${zeroPad((new Date(Date.now())).getDate())}T${formattedtime}.000Z`
const test= new Date(format);
console.log(test);
