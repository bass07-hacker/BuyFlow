package com.buyflow.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.uploads.dir}")
    private String uploadsDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Sert les photos d'articles en lecture seule ; aucune execution de script possible sur ce chemin.
        String location = "file:" + uploadsDir.replaceAll("/$", "") + "/";
        registry.addResourceHandler("/uploads/**").addResourceLocations(location);
    }
}
