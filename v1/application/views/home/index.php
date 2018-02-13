<div class="section">
    <!-- My logo -->
    <div style="position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;">
        <div>
            <p style="color: #c4c4c4; font-size: 12px; margin-bottom: 0;">Created and Designed by</p>
            <a href="http://mazeyar.nl"><img src="http://mazeyar.nl/images/logo.png" alt="Mazeyar Rezaei Ghavamabadi"></a>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <!--All floors-->
                <?php for ($i = $floors; $i > 0; $i--) { ?>
                    <div id="level-<?php echo $i ?>" class="level <?php echo ($i == 1) ? "level-active" : "" ?>">
                        <div class="btnContainer">
                            <div class="elevator-buttons-<?php echo $i ?>"" style="display:<?php echo ($i !== 1) ? "none" : "" ?>">
                                <!-- All buttons inside the elevator -->
                                <?php for ($btnI = $floors; $btnI > 0; $btnI--) { ?>
                                    <button class="btn btn-info btnLevel btn-call elevatorButtons-<?php echo $btnI ?>" data-level="<?php echo $btnI ?>"> <?php echo $btnI ?></button>
                                <?php } ?>
                            </div>
                        </div>

                        <!-- Up and Down buttons -->
                        <span class="level-indicator">
                            <div class="row">
                                <div class="col-md-12">
                                    <?php if($i != $floors) { ?>
                                        <button class="btn-call btn btn-primary glyphicon glyphicon-upload" data-level="<?php echo $i ?>"></button><br>
                                    <?php } ?>

                                    <span class="label label-default level-indicator-label"><?php echo $i ?></span>

                                    <?php if ($i != 1) { ?>
                                        <br><button class="btn-call btn btn-primary glyphicon glyphicon-download" data-level="<?php echo $i ?>"></button>
                                    <?php } ?>
                                </div>
                            </div>
                        </span>
                    </div>
                <?php } ?>
            </div>
            <!-- Elevator status labels -->
            <div class="col-md-6">
                <div class="machine-indicator">
                    <span id="lblArrived" class="label label-success" style="display: none;">Arrived</span>
                    <span id="lblMoving" class="label-elevator-status label label-warning" style="display: none;">Moving</span>
                    <span id="lblDoorsOpen" class="label-elevator-status label label-info" style="display: none;">Doors open</span>
                    <span id="lblDoorsClose" class="label-elevator-status label label-danger" style="display: none;">Doors closed</span>
                    <span id="lblNotActive" class="label label-default">Not Active</span>
                </div>
            </div>
        </div>
    </div>
</div>
