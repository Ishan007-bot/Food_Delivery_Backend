package com.backend.fooddelivery.controller;

import com.backend.fooddelivery.service.FileUploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

/**
 * File Controller - General file upload endpoints
 */
@RestController
@RequestMapping("/api/files")
@Tag(name = "Files", description = "File upload and management operations")
public class FileController {

    private final FileUploadService fileUploadService;

    public FileController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload")
    @Operation(summary = "Upload a file", description = "Upload a file to the server")
    public ResponseEntity<Map<String, Object>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "general") String folder) {

        String filePath = fileUploadService.uploadFile(file, folder);

        // Build the file URL dynamically based on the current request
        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(filePath)
                .toUriString();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("filePath", filePath);
        response.put("fileUrl", fileUrl);
        response.put("fileName", file.getOriginalFilename());
        response.put("fileSize", file.getSize());
        response.put("contentType", file.getContentType());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{folder}/{filename}")
    @Operation(summary = "Delete a file", description = "Delete a file from the server")
    public ResponseEntity<Map<String, Object>> deleteFile(
            @PathVariable String folder,
            @PathVariable String filename) {

        fileUploadService.deleteFile(folder + "/" + filename);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "File deleted successfully");

        return ResponseEntity.ok(response);
    }
}
