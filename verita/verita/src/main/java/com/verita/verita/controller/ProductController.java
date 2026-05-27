package com.verita.verita.controller;

import com.verita.verita.dto.ProductDTO;
import com.verita.verita.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*") 
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{barcode}")
    public ProductDTO getProduct(@PathVariable String barcode) { // <-- Agora retorna ProductDTO
        return productService.getProductByBarcode(barcode);
    }

    @GetMapping("/search")
    public ResponseEntity<ProductDTO> searchProductByName(@RequestParam String name) {
        try {
            // Chama o service para buscar pelo nome
            ProductDTO product = productService.searchByName(name);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}