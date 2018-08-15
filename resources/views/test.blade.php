<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/car.css') }}" />
</head>
<body>
    <div class="container">
        <div class="row mt-3">
            <div class="input-group col-lg-2">
                <label>
                    <select id="car-model" class="form-control changeable">
                        <option value="BMW">select car model</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Opel">Opel</option>
                    </select>
                </label>
            </div>

            <div class="input-group col-lg-2">
                <label>
                    <input value="#ff0000" id="car-color" type="color" class="changeable form-control" style="width: 150px">
                </label>
            </div>

            <div class="input-group col-lg-2">
                <label>
                    <select name="" id="speed" class=" changeable form-control">
                        <option value="20">Select Speed</option>
                        <option value="100">20km/h</option>
                        <option value="80">40km/h</option>
                        <option value="60">60km/h</option>
                        <option value="40">80km/h</option>
                        <option value="20">100km/h</option>
                        <option value="5">150km/h(danger)</option>
                    </select>
                </label>
            </div>
            <div class="input-grup col-lg-2">
                <label for="">
                    <select class="changeable form-control" id="type">
                        <option value="sedan">select car type</option>
                        <option value="sedan">Sedan</option>
                        <option value="offroader">Offroader</option>
                    </select>
                </label>
            </div>

        </div>
        <button id="generate">Generate</button>
    </div>




    <div>
        <div id="road" class="relative">
            {{--<div id="trap"></div>--}}
            <div class="row">
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
                <div class="lines" ></div>
            </div>
        </div>
        <div id="car" class="relative">
            <div id="car-top" class="relative">
                <div id="left-window" class="absolute"></div>
                <div id="right-window" class="absolute"></div>
            </div>
            <div id="car-body">
                <div id="car-logo">BMW</div>
            </div>
            <div class="wheels absolute" id="leftwheel">
                <div class="circle">
                    <span class="horizontal-line"></span>
                    <span class="vertical-line"></span>
                </div>
            </div>
            <div class="wheels absolute" id="rightwheel">
                <div class="circle">

                    <span class="horizontal-line"></span>
                    <span class="vertical-line"></span>
                </div>
            </div>
        </div>

    </div>


    <!-- Scripts -->
    <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    <script type="text/javascript" src="{{ asset('build/main.js') }}"></script>
    <!-- End Scripts -->

</body>
</html>
