let searching = {

    startSlider : document.getElementById('slider-start'),
    limitFieldMin : document.getElementById('slider-limit-min'),
    limitFieldMax : document.getElementById('slider-limit-max'),
    items : [],
    itemNames : [],
    input : document.getElementById('search'),
    matchesUl : document.getElementById('matches'),
    liNum : 0,
    matchesCount : 0,
    tagsCount : 0,
    tagsDataNames : [],
    selectedCategories : [],

    properties : {
        rangeMin : 0,
        rangeMax : 1000,
        categories : ['Clothes' , 'Watches' , 'Phones' , 'Notebooks' , 'Gloves' , 'Cars' , 'Bikes' , 'Accessories' , 'Knives' , 'Books'],
        keywords : ['aaa' , 'bbb', 'ccc' , 'ddd' , 'eee' , 'fff' , 'ggg' , 'hhh' , 'iii' , 'jjj' , 'kkk' , 'lll' , 'mmm' , 'nnn' , 'ooo']
    },

    getKeyWords : (count) => {
        let arr = [];
        for(let i = 0; i < count ; i++){
            let num = Math.floor(Math.random()*searching.properties['keywords'].length);
            if(!arr.includes(searching.properties['keywords'][num])){
                arr[i] = searching.properties['keywords'][num];
            }
        }
        return arr;
    },

    generateString : (count) => {
        let text = "";
        let possible = "abcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < count; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },

    getNum : () => {
        return Math.floor(Math.random()*10);
    },

    hasClass : (element , className) => {
        return element.classList.contains(className);
    },

    generateSlider : () => {
        noUiSlider.create(searching.startSlider, {
            start: [70, 930],
            step:10,
            range: {
                'min': [ 0 ],
                'max': [ 1000 ]
            }
        });
    },

    generateItemsArr : () => {
        for (let i = 0; i < 100; i++) {
            searching.items[i] = {};
            searching.items[i]['name'] = searching.generateString(7);
            searching.itemNames[i] = searching.items[i]['name'];
            searching.items[i]['description'] = searching.generateString(25);
            searching.items[i]['price'] = Math.floor(Math.random()*1000);
            searching.items[i]['category'] =  searching.properties['categories'][searching.getNum()];
            searching.items[i]['thumbnailSrc'] = `/images/${searching.items[i]['category']}/${searching.getNum()}.jpg`;
            searching.items[i]['keywords'] = searching.getKeyWords(3);
        }
    },

    generateCategoriesBox : () => {
        for(let category of searching.properties['categories']){
            let div = document.createElement('div');
            div.innerHTML = category + " ";
            let input = document.createElement('input');
            input.setAttribute('type' , 'checkbox');
            input.setAttribute('id' , category);
            input.addEventListener('click' , function (event) {
                searching.filter(event);
            });
            div.appendChild(input);
            document.getElementById('categories').appendChild(div);
        }
    },

    inputSearch : (event) => {
        if(event.which === 40 || event.which === 38 ||event.which === 13) return ;
        searching.matchesUl.innerHTML = '';
        searching.matchesCount = 0;
        searching.liNum = 0;
        searching.matchesUl.scrollTop = 0;
        let keyWord = '';

        for (item of searching.items) {
            if(item['name'].indexOf(searching.input.value) > -1 && searching.input.value!=="" && searching.input.value!==" " ){
                let dataId = item['name'];
                let li = document.createElement('li');
                li.setAttribute('data-name' , dataId);
                li.classList.add('list-group-item');
                li.innerHTML = item['name'];
                searching.matchesUl.appendChild(li);
                searching.matchesCount++;
            }
            for(let j of searching.properties['keywords']){
                if(typeof j !== "undefined"){
                    if(j.match(searching.input.value) && searching.input.value!=="" && searching.input.value!==" " && keyWord!==j){
                        keyWord = j;
                        let dataId = j;
                        let li = document.createElement('li');
                        li.setAttribute('data-name' , dataId);
                        li.classList.add('list-group-item');
                        li.innerHTML = keyWord;
                        searching.matchesUl.appendChild(li);
                        searching.matchesCount++;
                    }
                }

            }
        }
    },

    inputEvent : (event) => {
        if(event.which === 40 && searching.matchesCount > 0){ //down
            searching.liNum++;
            if (searching.liNum >= 8 ) {
                searching.matchesUl.scrollTop += 48;
            }
            if(searching.liNum > searching.matchesCount) {
                searching.liNum = 0;
                searching.matchesUl.scrollTop = 0;
                document.querySelector(`ul#matches li:last-child`).classList.remove('selected');
                document.querySelector(`ul#matches li:first-child`).classList.add('selected');
                return
            }
            let prevLi = document.querySelector(`ul#matches li:nth-child(${searching.liNum-1})`);
            if ( prevLi!==null && searching.hasClass(prevLi , 'selected')){
                document.querySelector(`ul#matches li:nth-child(${searching.liNum-1})`).classList.remove('selected');
                document.querySelector(`ul#matches li:nth-child(${searching.liNum})`).classList.add('selected');
            } else {
                document.querySelector(`ul#matches li:nth-child(${searching.liNum})`).classList.add('selected');
            }
        }

        if(event.which === 38 && searching.matchesCount > 0){ //up
            searching.liNum--;
            if(searching.liNum <= 0){
                searching.liNum = searching.matchesCount ;
                searching.matchesUl.scrollTop = searching.liNum*48;
                document.querySelector(`ul#matches li`).classList.remove('selected');
                document.querySelector(`ul#matches li:last-child`).classList.add('selected');
                return
            }
            if(searching.matchesUl.scrollTop > 0 ){
                searching.matchesUl.scrollTop -= 48   ;
            }
            let prevLi = document.querySelector(`ul#matches li:nth-child(${searching.liNum+1})`);
            if ( prevLi!==null && searching.hasClass(prevLi , 'selected') && searching.liNum >= 0 ) {
                document.querySelector(`ul#matches li:nth-child(${searching.liNum+1})`).classList.remove('selected');
                document.querySelector(`ul#matches li:nth-child(${searching.liNum})`).classList.add('selected');
            } else {
                document.querySelector(`ul#matches li:nth-child(${searching.liNum})`).classList.add('selected');
            }
        }

        if(event.which === 13 ) { //enter
            if(searching.tagsCount < 0){searching.tagsCount = 0}
            if(searching.liNum > 0) {
                let li = document.querySelector('ul#matches li.selected');
                let dataId = li.getAttribute('data-name');
                if(searching.tagsDataNames.indexOf(dataId) !== -1) {
                    let duplicatedTag = document.querySelector(`div[data-name="${dataId}"]`);
                    duplicatedTag.classList.add('shake');
                    setTimeout(function () {
                        duplicatedTag.classList.remove('shake');
                    },500);
                    return;
                }
                searching.tagsCount++;
                searching.tagsDataNames.unshift(dataId);
                let txt = li.innerHTML;
                let div = document.createElement('div');
                div.setAttribute('data-name' , dataId);
                let span = document.createElement('span');
                span.innerHTML = txt;
                let x = document.createElement('span');
                x.setAttribute('class' , 'remove');
                x.innerHTML = 'x';
                x.addEventListener('click' , function (event) {
                    searching.remove(event);
                });
                div.appendChild(span);
                div.appendChild(x);
                document.getElementById('tags').prepend(div);
                searching.input.value = '';

            } else {
                searching.tagsCount++;
                searching.tagsDataNames.unshift(searching.input.value);
                let txt = searching.input.value;
                let div = document.createElement('div');
                let span = document.createElement('span');
                div.setAttribute('data-name' , txt);
                span.innerHTML = txt;
                let x = document.createElement('span');
                x.setAttribute('class' , 'remove');
                x.innerHTML = 'x';
                x.addEventListener('click' , function (event) {
                    searching.remove(event);
                });
                div.appendChild(span);
                div.appendChild(x);
                document.getElementById('tags').prepend(div);
                searching.input.value = '';

            }
            searching.search(searching.tagsDataNames);

        }

        if(event.which === 8) { //backspace
            if(searching.input.value ==='' && searching.tagsCount !== 0){
                searching.tagsDataNames.pop();
                document.querySelector(`div#tags div:nth-child(${searching.tagsCount})`).remove();
                searching.tagsCount--;
                searching.search(searching.tagsDataNames);
            }
        }
    },

    search : (names) => {
        document.getElementById('item-box').innerHTML = '';
        for (let item of searching.items) {
            if(names.indexOf(item['name']) !== -1 && item['price'] >= searching.properties.rangeMin && item['price'] <= searching.properties.rangeMax) {
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
                if(names.indexOf(keyWord) !== -1 && item['price'] >= searching.properties.rangeMin && item['price'] <= searching.properties.rangeMax){
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
            if(searching.input.value === item['category'] && item['price'] >= searching.properties.rangeMin && item['price'] <= searching.properties.rangeMax) {
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
    },
    filterByCategories :(names , categories) => {
        if (categories.length === 0) {
            searching.search(searching.tagsDataNames);
            return;
        }
        document.getElementById('item-box').innerHTML = '';
        for (let item of searching.items) {
            if(names.indexOf(item['name']) !== -1 && item['price'] >= searching.properties.rangeMin && item['price'] <= searching.properties.rangeMax && categories.indexOf(item['category']) !==-1) {
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
                if(names.indexOf(keyWord) !== -1 && item['price'] >= searching.properties.rangeMin && item['price'] <= searching.properties.rangeMax && categories.indexOf(item['category']) !==-1){
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
            if(searching.input.value === item['category'] && item['price'] >= searching.properties.rangeMin && item['price'] <= searching.properties.rangeMax && categories.indexOf(item['category']) !==-1) {
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
    },

    remove : (event) => {
        let div = event.target.parentNode;
        let dataName = div.getAttribute('data-name');
        let index = searching.tagsDataNames.indexOf(dataName);
        searching.tagsDataNames.splice(index , 1);
        // searching.tagsCount--;
        div.remove();
        searching.search(searching.tagsDataNames);
    },

    filter : (event) => {
        let categoryName = event.target.getAttribute('id');
        if(event.target.checked === true) {
            searching.selectedCategories.push(categoryName);
        } else {
            let index = searching.selectedCategories.indexOf(categoryName);
            searching.selectedCategories.splice(index , 1);

        }
        searching.filterByCategories(searching.tagsDataNames , searching.selectedCategories);
    }
};

searching.generateSlider();
searching.generateItemsArr();
searching.generateCategoriesBox();

searching.startSlider.noUiSlider.on('update',( values, handle ) => {
    (handle ? searching.limitFieldMax : searching.limitFieldMin).innerHTML = values[handle];
    [searching.properties.rangeMin,searching.properties.rangeMax] = values;
});

searching.startSlider.noUiSlider.on('end' , function () {
    if (searching.selectedCategories.length === 0){
        searching.search(searching.tagsDataNames);
    } else {
        searching.filterByCategories(searching.tagsDataNames , searching.selectedCategories);
    }
});

searching.input.addEventListener('keyup' , (event) => {
    searching.inputSearch(event);
});

searching.input.addEventListener('keydown' , (event) => {
    searching.inputEvent(event)
});









