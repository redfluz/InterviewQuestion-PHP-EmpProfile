<?php
spl_autoload_register(function ($className) {
    // Convert namespace to folder structure (replace \ with /)

    // Base directory for the "Class" namespace
    // Define base directory
    $basePath = __DIR__;
    // echo "Base Path: " . $basePath . "<br>";

// Define the main folders to check
    $folders = ['Class', 'Enum', 'Interface', 'Model'];

// Initialize an array to store file paths for each folder
    $filePaths = [];

// Loop through each folder and collect all PHP files
    foreach ($folders as $folder) {
        // Define the path for the current folder
        $folderPath = $basePath . '/' . $folder;

        // Check if the folder exists
        if (is_dir($folderPath)) {
            // Open the folder and read the contents
            $files = scandir($folderPath);

            // Loop through the files in the folder
            foreach ($files as $file) {
                // Only process PHP files
                if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                    // Store the file paths in the array
                    $filePaths[$folder][] = $folderPath . '/' . $file;
                }
            }
        } else {
            echo "Folder does not exist: " . $folderPath . "<br>";
        }
    }

// Now we can loop through the array of file paths and include the files
    foreach ($filePaths as $folder => $files) {
        // echo "Files in $folder folder:<br>";
        foreach ($files as $file) {
            //echo $file . "<br>"; // You can also include the files here
            require_once $file; // Include the file
        }
    }


});
