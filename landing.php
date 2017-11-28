<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9">
<!--[if IE]>         <html class="no-js ie">
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>HAVEN</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    </style>
     <script src="https://use.typekit.net/cng2euq.js"></script>
      <script>try{Typekit.load({ async: true });}catch(e){}</script>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
   <style type="text/css">
      .wf-loading{
        /* Hide the blog title and post titles while web fonts are loading */
        visibility: hidden;
      }
    </style>


    </head>
    <body style="padding: 0; margin: 0;">
    <div id="overlay">
    	<img id="haven-logo" class="logo" src="img/haven-transparent-logo.png">
    </div>


        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
<img src="img/haven-landing.jpg" style="width: 100vw;">

<a href="index.php"><button id="button" style="">Get Started</button></a>

<style type="text/css">
	#button{
		border-radius: 50px;
		width: 200px;
		background-color:#DC897E;
		padding: 20px;
		position: absolute;
		top:700px;
		border: none;
		right:50%;
		/*margin-left: -100px;*/
		color: white;
		display: block;
		font-size: 1.2em;

	}
	#button:hover{
		background-color: #d16456;
		cursor: pointer;
	}

	#overlay{
		background-color: #E9EBDE;
		/*background-color: red;*/
		z-index: 10;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#haven-logo{
		/*position: absolute;
		top: 50%;
		right: 50%;
		width: 400px;
		margin-left: -200px;*/
		width: 200px;
		height: auto;
	}

	.logo {
 animation: logo 5s infinite;
 -webkit-animation: logo 5s infinite;
 -moz-animation: logo 5s infinite;
 -o-animation: logo 5s infinite;
}

@-webkit-keyframes logo {
 0%, 100%{-webkit-transform:  scale(1);}
 50% {-webkit-transform:  scale(1.2);}
}

@-moz-keyframes logo {
 0%, 100%{-moz-transform: scale(1);}
 50% {-moz-transform: scale(1.2);}
}

@-o-keyframes logo {
 0%, 100%{-o-transform: scale(1);}
 50% {-o-transform: scale(1.2);}
}
@keyframes logo {
 0%, 100%{transform: scale(1);}
 50% {transform:  scale(1.2);}
}
</style>

<script type="text/javascript">

	$(window).load(function() {
 		$("#overlay").fadeOut(1000);
});
</script>

<?php include "footer.php";?>
