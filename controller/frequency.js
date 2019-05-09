var request = require('request');

//make a map of words sorted based on there frequencies only once and use it serve requests.
var mapSort;
request.get('https://terriblytinytales.com/test.txt', function (error, response, body) {
    console.log('done calculating ready for requests')
    if (!error && response.statusCode == 200) {
            var data = body.split(" ");
            let map = new Map()
            for(let i of data)
            {
                if(/^[a-z]+$/i.test(i)  && i.length>1){
                    if(map.has(i)){
                        map.set(i, map.get(i)+1)
                    }
                    else{
                        map.set(i, 1)
                    }
                }
            }
             mapSort = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));}
        })


const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
module.exports ={
    counter(req, res){
       var n = req.body.n;
       console.log(n)
       
            var r = []
            if(n>mapSort.size)
            {   let t = mapSort.entries()
                for(let e of t){
                    //console.log(typeof e[0], e[0])
                    r.push([e[0], e[1]])    
                }        
            }
            
            else{
            let c = 0;
            let t = mapSort.entries()
            for(let e of t){
                if(c==n)
                break;
                let k = e[0]
                let v = e[1]
                r.push([k, v])
                c++;
            }
            }
            //console.log(r)
            res.send(JSON.stringify({status:'done', result: r}, getCircularReplacer()))
        
    }
}