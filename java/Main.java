import java.io.*;
import java.util.*;

public class Main {

  public static void main(String[] args) throws IOException {
    Solution mySolution = new Solution();
    return;
  }

  public static void printArr(String name, int[] arr) {
    System.out.print("\n" + name + " : ");
    for (int i = 0; i < arr.length; i += 1) {
      System.out.print(arr[i] + ", ");
    }
    System.out.print("\n");
  }

  public static void printArr(String name, long[] arr) {
    System.out.print("\n" + name + " : ");
    for (int i = 0; i < arr.length; i += 1) {
      System.out.print(arr[i] + ", ");
    }
    System.out.print("\n");
  }

  public static void printArr(String name, boolean[] arr) {
    System.out.print("\n" + name + " : ");
    for (int i = 0; i < arr.length; i += 1) {
      System.out.print(arr[i] + ", ");
    }
    System.out.print("\n");
  }

  public static void printArr(String name, String[] arr) {
    System.out.print("\n" + name + " : ");
    for (int i = 0; i < arr.length; i += 1) {
      System.out.print(arr[i] + ", ");
    }
    System.out.print("\n");
  }

  public static void printAdjacencyListGraph(ArrayList<ArrayList<Integer>> adjLst) {
    int n = adjLst.size();
    for (int i = 0; i < n; i += 1) {
      System.out.print(i + ": ");
      ArrayList<Integer> currLst = adjLst.get(i);
      int currLstSize = currLst.size();
      for (int j = 0; j < currLstSize; j += 1) {
        System.out.print(currLst.get(j) + " ");
      }
      System.out.print("\n");
    }
    return;
  }

}
