let properties = {
    rangeMin : 0,
    rangeMax : 1000,
    categories : ['clothes' , 'watches' , 'phones' , 'notebooks' , 'gloves' , 'cars' , 'bikes' , 'accessories' , 'knives' , 'books'],
    keywords : ['aaa' , 'bbb', 'ccc' , 'ddd' , 'eee' , 'fff' , 'ggg' , 'hhh' , 'iii' , 'jjj' , 'kkk' , 'lll' , 'mmm' , 'nnn' , 'ooo']
};

getKeyWords = (count) => {
    let arr = [];
    for(let i = 0; i < count ; i++){
        let num = Math.floor(Math.random()*properties['keywords'].length);
        if(!arr.includes(properties['keywords'][num])){
            arr[i] = properties['keywords'][num];
        }
    }
    return arr;
};

generateString = (count) => {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

getNum = () => {
    return Math.floor(Math.random()*10);
};

hasClass = (element , className) => {
    return element.classList.contains(className);
};


let startSlider = document.getElementById('slider-start');
noUiSlider.create(startSlider, {
    start: [70, 930],
    step:10,
    range: {
        'min': [ 0 ],
        'max': [ 1000 ]
    }
});
let limitFieldMin = document.getElementById('slider-limit-min');
let limitFieldMax = document.getElementById('slider-limit-max');

startSlider.noUiSlider.on('update',( values, handle ) => {
    (handle ? limitFieldMax : limitFieldMin).innerHTML = values[handle];
    [properties.rangeMin,properties.rangeMax] = values;
});

startSlider.noUiSlider.on('end' , function () {
   search(tagsDataNames);
});

let items = [];
let itemNames = [];
for (let i = 0; i < 100; i++) {
    items[i] = {};
    items[i]['name'] = generateString(7);
    itemNames[i] = items[i]['name'];
    items[i]['description'] = generateString(25);
    items[i]['price'] = Math.floor(Math.random()*1000);
    items[i]['category'] =  properties['categories'][getNum()];
    items[i]['thumbnailSrc'] = `/images/${items[i]['category']}/${getNum()}.jpg`;
    items[i]['keywords'] = getKeyWords(3);
}
let input = document.getElementById('search');
let matchesUl = document.getElementById('matches');

let liNum = 0;
let matchesCount = 0;

input.addEventListener('keyup' , (event) => {

    if(event.which === 40 || event.which === 38 ||event.which === 13){return}
    matchesUl.innerHTML = '';
    matchesCount = 0;
    liNum = 0;
    matchesUl.scrollTop = 0;
    let keyWord = '';

   for (item of items) {
       if(item['name'].indexOf(input.value) > -1 && input.value!=="" && input.value!==" " ){
           let dataId = item['name'];
           let li = document.createElement('li');
           li.setAttribute('data-name' , dataId);
           li.classList.add('list-group-item');
           li.innerHTML = item['name'];
           matchesUl.appendChild(li);
           matchesCount++;
       }
       for(let j of properties['keywords']){
           if(typeof j !== "undefined"){
               if(j.match(input.value) && input.value!=="" && input.value!==" " && keyWord!==j){
                   keyWord = j;
                   let dataId = j;
                   let li = document.createElement('li');
                   li.setAttribute('data-name' , dataId);
                   li.classList.add('list-group-item');
                   li.innerHTML = keyWord;
                   matchesUl.appendChild(li);
                   matchesCount++;
               }
           }

       }
   }
});

let tagsCount = 0;
let tagsDataNames = [];

input.addEventListener('keydown' , (event) => {

    if(event.which === 40){ //down
        liNum++;
        if (liNum >= 8 ) {
            matchesUl.scrollTop += 48;
        }
        if(liNum > matchesCount) {
            liNum = 0;
            matchesUl.scrollTop = 0;
            document.querySelector(`ul#matches li:last-child`).classList.remove('selected');
            document.querySelector(`ul#matches li:first-child`).classList.add('selected');
            return
        }
        let prevLi = document.querySelector(`ul#matches li:nth-child(${liNum-1})`);
        if ( prevLi!==null && hasClass(prevLi , 'selected')){
            document.querySelector(`ul#matches li:nth-child(${liNum-1})`).classList.remove('selected');
            document.querySelector(`ul#matches li:nth-child(${liNum})`).classList.add('selected');
        } else {
            document.querySelector(`ul#matches li:nth-child(${liNum})`).classList.add('selected');
        }
    }

    if(event.which === 38){ //up
        liNum--;
        if(liNum <= 0){
            liNum = matchesCount ;
            matchesUl.scrollTop = liNum*48;
            document.querySelector(`ul#matches li`).classList.remove('selected');
            document.querySelector(`ul#matches li:last-child`).classList.add('selected');
            return
        }
        if(matchesUl.scrollTop > 0 ){
            matchesUl.scrollTop -= 48   ;
        }
        let prevLi = document.querySelector(`ul#matches li:nth-child(${liNum+1})`);
        if ( prevLi!==null && hasClass(prevLi , 'selected') && liNum >= 0 ) {
            document.querySelector(`ul#matches li:nth-child(${liNum+1})`).classList.remove('selected');
            document.querySelector(`ul#matches li:nth-child(${liNum})`).classList.add('selected');
        } else {
            document.querySelector(`ul#matches li:nth-child(${liNum})`).classList.add('selected');
        }
    }

    if(event.which === 13) { //enter
        if(tagsCount < 0){tagsCount = 0}
        if(liNum > 0) {
            let li = document.querySelector('ul#matches li.selected');
            let dataId = li.getAttribute('data-name');
            if(tagsDataNames.indexOf(dataId) !== -1) {
                let duplicatedTag = document.querySelector(`div[data-name="${dataId}"]`);
                duplicatedTag.classList.add('shake');
                setTimeout(function () {
                    duplicatedTag.classList.remove('shake');
                },500);
                return;
            }
            tagsCount++;
            tagsDataNames.unshift(dataId);
            let txt = li.innerHTML;
            let div = document.createElement('div');
            div.setAttribute('data-name' , dataId);
            let span = document.createElement('span');
            span.innerHTML = txt;
            let x = document.createElement('span');
            x.setAttribute('class' , 'remove');
            x.innerHTML = 'x';
            x.addEventListener('click' , remove);
            div.appendChild(span);
            div.appendChild(x);
            document.getElementById('tags').prepend(div);
            input.value = '';

        }
        search(tagsDataNames);

    }

    if(event.which === 8) { //backspace
        if(input.value ==='' && tagsCount !==0){
            tagsDataNames.pop();
            document.querySelector(`div#tags div:nth-child(${tagsCount})`).remove();
            tagsCount--;
            search(tagsDataNames);
        }
    }
});

search = (names) => {
    document.getElementById('item-box').innerHTML = '';
  for (let item of items) {
      if(names.indexOf(item['name']) !== -1 && item['price'] >= properties.rangeMin && item['price'] <= properties.rangeMax) {
          let mainDiv = document.createElement('div');
          mainDiv.classList.add('col-md-3');
          let imageDiv = document.createElement('div');
          imageDiv.classList.add('image');
          let img = document.createElement('img');
          img.setAttribute('src',item['thumbnailSrc']);
          let title = document.createElement('div');
          title.classList.add('title', 'text-center');
          title.innerHTML = item['name'];
          let description = document.createElement('div');
          description.classList.add('description');
          description.innerHTML = item['description'];
          let price = document.createElement('div');
          price.innerHTML = item['price'] + '$';
          price.classList.add('price');
          let span = document.createElement('span');
          span.innerHTML = 'price : ';

          price.prepend(span);
          imageDiv.appendChild(img);
          mainDiv.appendChild(imageDiv);
          mainDiv.appendChild(title);
          mainDiv.appendChild(description);
          mainDiv.appendChild(price);

          document.getElementById('item-box').appendChild(mainDiv);
      }
      for(let keyWord of item['keywords']) {
          if(names.indexOf(keyWord) !== -1 && item['price'] >= properties.rangeMin && item['price'] <= properties.rangeMax){
              let mainDiv = document.createElement('div');
              mainDiv.classList.add('col-md-3');
              let imageDiv = document.createElement('div');
              imageDiv.classList.add('image');
              let img = document.createElement('img');
              img.setAttribute('src',item['thumbnailSrc']);
              let title = document.createElement('div');
              title.classList.add('title', 'text-center');
              title.innerHTML = item['name'];
              let description = document.createElement('div');
              description.classList.add('description');
              description.innerHTML = item['description'];
              let price = document.createElement('div');
              price.innerHTML = item['price'] + '$';
              price.classList.add('price');
              let span = document.createElement('span');
              span.innerHTML = 'price : ';

              price.prepend(span);
              imageDiv.appendChild(img);
              mainDiv.appendChild(imageDiv);
              mainDiv.appendChild(title);
              mainDiv.appendChild(description);
              mainDiv.appendChild(price);

              document.getElementById('item-box').appendChild(mainDiv);
          }
      }
      if(input.value === item['category'] && item['price'] >= properties.rangeMin && item['price'] <= properties.rangeMax) {
          let mainDiv = document.createElement('div');
          mainDiv.classList.add('col-md-3');
          let imageDiv = document.createElement('div');
          imageDiv.classList.add('image');
          let img = document.createElement('img');
          img.setAttribute('src',item['thumbnailSrc']);
          let title = document.createElement('div');
          title.classList.add('title', 'text-center');
          title.innerHTML = item['name'];
          let description = document.createElement('div');
          description.classList.add('description');
          description.innerHTML = item['description'];
          let price = document.createElement('div');
          price.innerHTML = item['price'] + '$';
          price.classList.add('price');
          let span = document.createElement('span');
          span.innerHTML = 'price : ';

          price.prepend(span);
          imageDiv.appendChild(img);
          mainDiv.appendChild(imageDiv);
          mainDiv.appendChild(title);
          mainDiv.appendChild(description);
          mainDiv.appendChild(price);

          document.getElementById('item-box').appendChild(mainDiv);
      }

  }
};

function remove  (event) {
    let div = event.target.parentNode;
    let dataName = div.getAttribute('data-name');
    let index = tagsDataNames.indexOf(dataName);
    tagsDataNames.splice(index , 1);
    tagsCount--;
    div.remove();
    search(tagsDataNames);
}
