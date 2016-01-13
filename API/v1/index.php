<?php
spl_autoload_register();

require 'RestServer.php';
require 'TestController.php';

$server = new RestServer('debug');
//$server->refreshCache();

$server->addClass('TestController');
$server->handle();
