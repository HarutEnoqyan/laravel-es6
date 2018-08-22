<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/test2.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/nouislider.min.css') }}" />
</head>
<body>

<div class="container main pt-2">
    <div id="searchingBox" class="relative">
        <label for="search">Search</label>
        <div id="tags" class="border pl-1">
            <input type="text" id="search" class="form-control" placeholder="Search" autocomplete="off">
        </div>
        <ul id="matches" class="list-group absolute">
        </ul>
    </div>
    <div id="filter" class="absolute">
        <h4>Filter By</h4>
        <div id="categories">
            <h6>Categories</h6>
        </div>
        <div id="costing" class="mt-5">
            <h6>Costing range</h6>
            <div id="slider-start">
            </div>
            <div class="row mt-2">
                <div class="col-lg-4 pr-0">min :</div>
                <div id="slider-limit-min" class="col-lg-8 pl-0"></div>
            </div>

            <div class="row">
                <div class="col-lg-4 pr-0">max :</div>
                <div id="slider-limit-max" class="col-lg-8 pl-0"></div>
            </div>
        </div>
    </div>
    
    <div class="row" id="item-box">

    </div>
</div>


<!-- Scripts -->
<script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
<script type="text/javascript" src="{{ asset('build/test2.js') }}"></script>
<!-- End Scripts -->

</body>
</html>
