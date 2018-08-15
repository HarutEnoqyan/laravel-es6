let car = {
    road : document.getElementById('road'),
    lines : document.body.querySelector('#road div.row'),
    wheels : document.getElementsByClassName('wheels'),
    generateBtn : document.getElementById('generate'),
    carBody : document.getElementById('car-body'),
    carTop : document.getElementById('car-top'),
    logo : document.getElementById('car-logo'),
    $car : document.getElementById('car'),
    carPosition : 1,
    right : 0,
    interval : 0,
    interval2 : 0,
    wheelRotate : 50,
    speed : 20,
    properties : {
        model : null,
        speed : null ,
        color : null ,
        type : null
    },
    generate : function () {
        car.properties['model'] = document.getElementById('car-model').value;
        car.properties['speed'] = document.getElementById('speed').value;
        car.properties['color'] = document.getElementById('car-color').value;
        car.properties['type'] = document.getElementById('type').value;
        let {model,speed,color} = car.properties;
        car.logo.innerHTML = model;
        car.speed = speed;
        car.carBody.style.background = color;
        car.carTop.style.background = color;
    },

    roadMoving : function () {
        this.right-=5 ;
        this.wheelRotate+=5;
        if (this.right <= -323 ) {
            this.right = 0;
        }
        if(this.wheelRotate >=1440){
            this.wheelRotate=0;
        }
        this.lines.style.transform = `translateX(${this.right}px)`;
        for (let wheel of this.wheels){
            wheel.style.transform = `rotate(${this.wheelRotate}deg)`
        }
    },

    createTraps : () => {
        let trapPosition = Math.floor(Math.random()*2);
        if(document.querySelector('.trap')!=null){
            document.querySelector('.trap').remove();
        }
        let div = document.createElement('div');
        div.setAttribute('class','trap');
        divPosition = -130;
        if (trapPosition ===1){
            div.style.top = 50+'px';
        }else {
            div.style.top = 260+'px';
        }
        window.clearInterval(car.interval2);

        car.interval2 = setInterval(()=>{
            divPosition+=5;
            div.style.right = divPosition+'px';
            if(divPosition===1255 && trapPosition===car.carPosition) {
                setTimeout(()=>{
                    alert('you lose')
                },100)
            }
            if (divPosition >= 1600) {
                car.createTraps();
            }
        },car.speed);
        car.road.appendChild(div);

    }
};

document.body.querySelector('.changeable    ').addEventListener('change',car.generate);
document.getElementById('generate').addEventListener('click' , car.generate);
document.body.addEventListener('keydown' , (event) => {
    switch ( event.keyCode ) {
        case 39 : window.clearInterval(car['interval']); window.clearInterval(car.interval2); car['interval']= setInterval(()=>{car.roadMoving()},car.speed) ;car.createTraps();
        break;
        case 32: window.clearInterval(car['interval']);window.clearInterval(car.interval2);
        break;
        case 38 : car.$car.style.transform = 'translate(100px , -358px)';car.carPosition=1;
        break;
        case 40 : car.$car.style.transform = 'translate(100px , -150px)';car.carPosition = 0;

    }
});
