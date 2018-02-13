<!DOCTYPE html>
<html lang="nl">
    <head>
        <title><?php echo $this->browser_title; ?></title>
    </head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="../bootstrap/css/custom.css">
<body>
    <!-- Main content -->
    <section class="content">

        <?php require_once('application/views/' . $_view . '.php'); ?>

    </section>
    <?php if(!empty($this->footer)) require_once('application/views/' . $this->footer . '.php'); ?>
</body>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/sweetalert2@7.11.0/dist/sweetalert2.all.js"></script>
    <script type="text/javascript" src="../bootstrap/js/custom.js"></script>
</html>
