<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Meta -->
    <meta name="description" content="Responsive Bootstrap 5 Dashboard Template">
    <meta name="author" content="ParkerThemes">
    <!-- Title -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{title_html}</title>
    <link rel="icon" type="image/x-icon" href="{base_url}favicon.ico">

    <!-- bootstap 5 -->
    <link rel="stylesheet" href="{base_url}assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="{base_url}assets/css/jquery-ui.min.css">
    <!-- font awesome -->
    <link rel="stylesheet" href="{base_url}assets/plugins/fontawesome-free/css/all.min.css">
    <!-- Sweetalert2 -->
    <link rel="stylesheet" href="{base_url}assets/css/sweetalert2.min.css">

    <link rel="stylesheet" href="{base_url}assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">

    <!-- Main Css -->

    <link rel="stylesheet" href="{base_url}assets/css/_var_main.css">
    <link rel="stylesheet" href="{base_url}assets/dist/master.min.css">
    <link rel="stylesheet" href="{base_url}assets/css/style_custom.css">


    {another_css}


</head>
<style>
    :root {
        --hue: 223;
        --bg: hsl(var(--hue), 10%, 90%);
        --fg: hsl(var(--hue), 10%, 10%);
    }


    .pl {
        display: block;
        width: 6.25em;
        height: 6.25em;
    }

    .pl__ring,
    .pl__ball {
        animation: ring 2s ease-out infinite;
    }

    .pl__ball {
        animation-name: ball;
    }

    /* Dark theme  */
    @media (prefers-color-scheme: dark) {
        :root {
            --bg: hsl(var(--hue), 10%, 10%);
            --fg: hsl(var(--hue), 10%, 90%);
        }
    }

    /* Animation */
    @keyframes ring {
        from {
            stroke-dasharray: 0 257 0 0 1 0 0 258;
        }

        25% {
            stroke-dasharray: 0 0 0 0 257 0 258 0;
        }

        50%,
        to {
            stroke-dasharray: 0 0 0 0 0 515 0 0;
        }
    }

    @keyframes ball {

        from,
        50% {
            animation-timing-function: ease-in;
            stroke-dashoffset: 1;
        }

        64% {
            animation-timing-function: ease-in;
            stroke-dashoffset: -109;
        }

        78% {
            animation-timing-function: ease-in;
            stroke-dashoffset: -145;
        }

        92% {
            animation-timing-function: ease-in;
            stroke-dashoffset: -157;
        }

        57%,
        71%,
        85%,
        99%,
        to {
            animation-timing-function: ease-out;
            stroke-dashoffset: -163;
        }
    }

    .loading-page {
        position: absolute;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        background-color: white;
        width: 100%;
        height: inherit;
    }
</style>

<body id="page-top">
    <!-- loading page -->
    <div class="loading-page">
        <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                    <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                    <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
                <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                    <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
            </defs>
            <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
            <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
        </svg>
        <div>L O A D I N G . . .</div>
    </div>


    <!-- Page wrapper start -->
    <div id="wrapper">
        <!-- Sidebar start -->
        {left_sidebar}
        <!--Sidebar End -->
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <div class="d-flex w-100 align-items-center">
                        <div class="breadcrumb-container">
                            {breadcrumb_list}
                        </div>
                        <!-- Topbar Navbar -->
                        {top_navbar}
                    </div>


                </nav>


                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- breadcrumb_list Starts -->

                    <!-- breadcrumb_list End -->
                    <div class="main-container">
                        {page_content}
                    </div>

                </div>
                <!-- Begin Page Content -->
            </div>

            <!-- App footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright © {application_varsion}</span>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    
    <!-- jquery -->
    <script src="{base_url}assets/js/jquery-3.6.0.min.js"></script>
    <script src="{base_url}assets/js/jquery-ui.min.js"></script>
    <script src="{base_url}assets/js/jquery.cookie.min.js"></script>
    <script src="{base_url}assets/dist/jquery.easing.min.js"></script>

    <!-- bootstap 5 -->
    <script src="{base_url}assets/dist/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Sweetalert2 -->
    <script src="{base_url}assets/js/sweetalert2.all.min.js"></script>

    <script src="{base_url}assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>

    <!-- DataTables -->
    <script src="{base_url}assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="{base_url}assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="{base_url}assets/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
    <script src="{base_url}assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>

    <!-- Sortable -->
    <script src="{base_url}assets/js/Sortable.js"></script>

    <script src="{base_url}assets/dist/master.min.js"></script>


    <!-- Main java Script -->
    <script src="{base_url}assets/js/ci_utilities.js?ft=<?= date('His') ?>"></script>

    <script>
        var baseURL = '{base_url}';
        var siteURL = '{site_url}';
        var csrf_token_name = '{csrf_token_name}';
        var csrf_cookie_name = '{csrf_cookie_name}';
        localStorage.setItem('lang_js', '<?= $this->session->userdata('language'); ?>')
        $.widget.bridge('uibutton', $.ui.button)


        OverlayScrollbars($('#menu-sidebar')[0], {
            overflow: {
                x: 'hidden',
            },
        });

        $('#sidebarToggle').click(() => {
            $('#accordionSidebar').hasClass('toggled') ? $('#sidebarToggle i').addClass('active') : $('#sidebarToggle i').removeClass('active')
        })

        $('.loading-page').fadeOut(3000)
    </script>

    {another_js}


</body>

</html>