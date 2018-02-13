<?php
	Class Home extends Controller
	{
		public function index()
		{
		    $floorSize = 5;
			$this->view('home/index', ["floors" => $floorSize]);
		}
	}