<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>artstudio 101</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="favicon.png" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/artstudio-101.css">
        <!-- TODO: remove all of these css dependencies! :o -->
        <link rel="stylesheet" href="css/vendor/slick.css">
        <link rel="stylesheet" href="css/vendor/slick-theme.css">

        <script src="js/vendor/fontawesome-all.min.js"></script>        
        <!-- TODO: remove all of these js dependencies! :o -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/dom4/1.5.2/dom4.js">/* DOM4 */</script>
        <script src="js/vendor/jquery-2.1.3.min.js"></script>
        <script src="js/vendor/lodash.min.js"></script>
        <script src="js/vendor/foundation.js"></script>
        <script src="js/vendor/slick.min.js"></script>
        
        <script>
            var onReCaptchaLoad = function() {
                var captchaWidgetId = grecaptcha.render( 'myCaptcha', {
                  'sitekey' : '6LePYSAUAAAAABNHx35SFN1JPPFupM9Jqa481OQa',  // required
                  'theme' : 'light',  // optional
                  'callback': 'verifyCallback'  // optional
                });
            };
        </script>
        <script src='https://www.google.com/recaptcha/api.js?render=explicit&onload=onReCaptchaLoad'></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <header>
            <div class="content-wrapper">
                <?php include('./views/header.html') ?>
            </div>
        </header>

        <section>
            <div class="content-wrapper">
                <?php include($pageContent); ?>
            </div>
        </section>

        <footer>
          <div class="content-wrapper">
              <?php include('./views/footer.html') ?>
          </div>
        </footer>

        <?php include('./views/contact-modal.html'); ?>

        <script src="js/main.js"></script>
        <script src="js/form-validation.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-65288269-2','auto');ga('send','pageview');
        </script>
        <script src="js/image-preloader.js"></script>
    </body>
</html>
