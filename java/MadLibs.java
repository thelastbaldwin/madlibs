import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Scanner;

public class MadLibs {

    public static void printHeadline(){
        String bar = String.join("", Collections.nCopies(25, "*"));
        String space = String.join("", Collections.nCopies(9, " "));
        System.out.println(bar);
        System.out.println(space + "MADLIBS" + space);
        System.out.println(bar);
    }

    public static void listFiles(File[] files){
        for (int i = 0; i < files.length; i++){
            if(files[i].isFile()){
                System.out.println(i + " " + files[i].getName());
            }
        }
    }

    public static String getTemplateFromList(File[] files, Scanner keyboard) throws Exception{
        int templateIndex  = keyboard.nextInt();
        if (templateIndex >= 0 && templateIndex < files.length){
            return new String(Files.readAllBytes(Paths.get(files[templateIndex].toString())));
        }
        System.out.println("\nChoose another index:");
        return null;
    }

    public static int nextOpeningTagIndex(String template, int from) { return template.indexOf("{", from); }
    public static int nextClosingTagIndex(String template, int from) { return template.indexOf("}", from); }
    public static boolean isVowel(String letter){ return "aeiouAEIOU".contains(letter); }

    public static void main( String[] args) throws Exception{
        Scanner kb = new Scanner(System.in);

        printHeadline();

        System.out.println("\nAvailable Templates:\n");
        File folder = new File("../templates/");
        File[] templates = folder.listFiles();
        listFiles(templates);

        String template = null;
        while(template == null){
            template = getTemplateFromList(templates, kb);
        }

        StringBuilder madLib = new StringBuilder();
        int stringIndex = 0;

        while(stringIndex != template.length()) {
            int openingTagIndex = nextOpeningTagIndex(template, stringIndex);
            int closingTagIndex;

            if(openingTagIndex > -1){
                closingTagIndex = nextClosingTagIndex(template, openingTagIndex);
                String token = template.substring(openingTagIndex + 1, closingTagIndex);
                System.out.println("\nEnter a" +  (isVowel(token.substring(0, 1)) ? "n" : "") + " " + token.toLowerCase());
                String replacementToken = kb.next();

                madLib.append(template.substring(stringIndex, openingTagIndex));
                madLib.append(replacementToken);
                stringIndex = closingTagIndex + 1;

            } else {
                stringIndex = template.length();
            }
        }

        System.out.println("\nYour madlib:");
        System.out.println(madLib.toString());
        
    }
}