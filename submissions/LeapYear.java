import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long n = scanner.nextLong(); // Using long to handle up to 10^9

        if (isLeapYear(n)) {
            System.out.println("YES");
        } else {
            System.out.println("NO");
        }

    }

    public static boolean isLeapYear(long year) {
        if (year % 400 == 0) {
            return true;
        } else if (year % 100 == 0) {
            return false;
        } else {
            return year % 4 == 0;
        }
    }
}
