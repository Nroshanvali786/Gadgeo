package com.example.demo.admin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.payment.Order;
import com.example.demo.payment.OrderItem;
import com.example.demo.payment.OrderItemRepo;
import com.example.demo.payment.OrderRepo;
import com.example.demo.payment.OrderStatus;
import com.example.demo.products.ProductRepository;

@Service
public class AdminBusinessService {

    private final OrderRepo orderRepository;
    private final OrderItemRepo orderItemRepository;
    private final ProductRepository productRepository;

    public AdminBusinessService(OrderRepo orderRepository,
                                OrderItemRepo orderItemRepository,
                                ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    public Map<String, Object> calculateMonthlyBusiness(int month, int year) {
        List<Order> successfulOrders =
                orderRepository.findSuccessfulOrdersByMonthAndYear(month, year);
        return calculateBusinessMetrics(successfulOrders);
    }

    public Map<String, Object> calculateDailyBusiness(LocalDate date) {
        List<Order> successfulOrders =
                orderRepository.findSuccessfulOrdersByDate(date);
        return calculateBusinessMetrics(successfulOrders);
    }

    public Map<String, Object> calculateYearlyBusiness(int year) {
        List<Order> successfulOrders =
                orderRepository.findSuccessfulOrdersByYear(year);
        return calculateBusinessMetrics(successfulOrders);
    }

    public Map<String, Object> calculateOverallBusiness() {
    	List<Order> successfulOrders =
    	        orderRepository.findAllByStatus(OrderStatus.SUCCESS);

//        BigDecimal totalBusiness = orderRepository.calculateOverallBusiness();
//        BigDecimal totalBusiness = orderRepository.calculateOverallBusiness();
        BigDecimal totalBusiness =
                orderRepository.calculateOverallBusiness(OrderStatus.SUCCESS);
        System.out.println("Overall Revenue: " + totalBusiness);

        if (totalBusiness == null) {
            totalBusiness = BigDecimal.ZERO;
        }

//        response.put("totalBusiness", totalBusiness);

        Map<String, Object> response =
                calculateBusinessMetrics(successfulOrders);

        response.put("totalBusiness", totalBusiness.doubleValue());
        return response;
    }

    private Map<String, Object> calculateBusinessMetrics(List<Order> orders) {

        double totalRevenue = 0.0;
        Map<String, Integer> categorySales = new HashMap<>();

        for (Order order : orders) {

            totalRevenue += order.getTotalAmount().doubleValue();

            List<OrderItem> items =
                    orderItemRepository.findByOrderId(order.getOrderId());

            for (OrderItem item : items) {

                String categoryName =
                        productRepository.findCategoryNameByProductId(
                                item.getProductId());

                categorySales.put(
                        categoryName,
                        categorySales.getOrDefault(categoryName, 0)
                                + item.getQuantity()
                );
            }
        }

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalRevenue", totalRevenue);
        metrics.put("categorySales", categorySales);

        return metrics;
    }
}