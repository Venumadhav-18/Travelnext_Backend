package backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "homestay_id", nullable = true)
    private Homestay homestay;

    @ManyToOne
    @JoinColumn(name = "guide_id", nullable = true)
    private Guide guide;

    private String itemType; // "homestay" or "guide"
    private String checkIn;
    private String checkOut;
    private Integer nights;
    private Double totalPrice;
    private String paymentMethod;

    @Column(length = 1024)
    private String paymentSummary;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private String createdAt;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }

    public Booking() {}

    public Booking(User user, Homestay homestay, Guide guide, String itemType, String checkIn, String checkOut, Integer nights, Double totalPrice, String paymentMethod, String paymentSummary, BookingStatus status, String createdAt) {
        this.user = user;
        this.homestay = homestay;
        this.guide = guide;
        this.itemType = itemType;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.nights = nights;
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.paymentSummary = paymentSummary;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Homestay getHomestay() { return homestay; }
    public void setHomestay(Homestay homestay) { this.homestay = homestay; }

    public Guide getGuide() { return guide; }
    public void setGuide(Guide guide) { this.guide = guide; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public String getCheckIn() { return checkIn; }
    public void setCheckIn(String checkIn) { this.checkIn = checkIn; }

    public String getCheckOut() { return checkOut; }
    public void setCheckOut(String checkOut) { this.checkOut = checkOut; }

    public Integer getNights() { return nights; }
    public void setNights(Integer nights) { this.nights = nights; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentSummary() { return paymentSummary; }
    public void setPaymentSummary(String paymentSummary) { this.paymentSummary = paymentSummary; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}