package util;

import org.json.simple.JSONObject;

import java.io.*;
import java.net.*;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class autoMail {
    public static HttpURLConnection conn = null;
    public static String cookie = "";
    public static void main(String[] args) throws IOException {
////        URL url = new URL("http://localhost:8092/auto2.html");
//
//
//            //URL url = new URL("52.78.168.175:8080/auto2.html");
//        URL url = new URL("http://52.78.168.175:8080/auto2.html");
//            conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Cookie", cookie);
//            conn.connect();
//
//    }
//
//    public static boolean isvalid(String strValue) {
//        try {
//            Integer.parseInt(strValue);
//            return true;
//        } catch (NumberFormatException ex) {
//            return false;
//        } catch (Exception ex) {
//            return false;
//        }
//            URL url = new URL("http://52.78.168.175:8080/auto2.html"); // 호출할 url
        URL url = new URL("https://43.200.35.210:8080/auto2.html"); // 호출할 url


            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "text/plain");
            connection.setRequestProperty("charset", "utf-8");
            connection.connect();


            Map<String,Object> params = new LinkedHashMap<>(); // 파라미터 세팅
            params.put("name", "james");
            params.put("email", "james@example.com");
            params.put("reply_to_thread", 10394);
            params.put("message", "Hello World");

            StringBuilder postData = new StringBuilder();
            for(Map.Entry<String,Object> param : params.entrySet()) {
                if(postData.length() != 0) postData.append('&');
                postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
                postData.append('=');
                postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
            }
            byte[] postDataBytes = postData.toString().getBytes("UTF-8");

            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
            conn.setDoOutput(true);
            conn.getOutputStream().write(postDataBytes); // POST 호출

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

            String inputLine;
            while((inputLine = in.readLine()) != null) { // response 출력
                System.out.println(inputLine);
            }

            in.close();
        }


}