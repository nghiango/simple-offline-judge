import java.util.*;

public class Sum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextInt()) {
            int n = sc.nextInt();
            int sum = 0;
            for (int i = 0; i < n; i++) {
                if (sc.hasNextInt()) {
                    sum += sc.nextInt();
                }
            }
            System.out.println(sum);
        }
    }
}
