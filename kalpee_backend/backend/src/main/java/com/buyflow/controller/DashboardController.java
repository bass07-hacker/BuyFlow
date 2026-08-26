package com.buyflow.controller;

import com.buyflow.dto.dashboard.DashboardResponse;
import com.buyflow.security.CurrentUser;
import com.buyflow.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse obtenir(@CurrentUser Long userId) {
        return dashboardService.obtenir(userId);
    }
}
