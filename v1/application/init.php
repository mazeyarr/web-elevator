<?php
	/**
	 * Import all core-classes.
	 */

	require_once 'core/Application.php';
	require_once 'core/Database.php';
	require_once 'core/Controller.php';
	
	require_once 'core/Settings.php';
	
	if(Settings::DEBUG)
		error_reporting(E_ALL);