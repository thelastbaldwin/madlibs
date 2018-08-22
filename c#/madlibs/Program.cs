using System;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;

namespace madlibs
{
    class MainClass
    {
        public static void printHeadline(){
            var bar = new String('*', 25);
            var space = new String(' ', 9);
            Console.WriteLine(bar);
            Console.WriteLine(space + "MADLIBS" + space);
            Console.WriteLine(bar);
        }

        public static void listFiles(string[] files){
            for (var i = 0; i < files.Length; i++){
                Console.WriteLine($"{i} {Path.GetFileName(files[i])}");
            }
        }

        public static string getTemplateFromList(string[] files){
            byte templateIndex = Convert.ToByte(Console.ReadLine());
            if (templateIndex >= 0 && templateIndex < files.Length){
                return File.ReadAllText(files[templateIndex]);
            }
            Console.WriteLine("\nChoose another index:");
            return null;
        }

        public static int nextOpeningTagIndex(string template, int from = 0) => template.IndexOf('{', from);
        public static int nextClosingTagIndex(string template, int from = 0) => template.IndexOf('}', from);
        public static bool isVowel(char letter) => "aeiouAEIOU".Contains(letter.ToString());

        public static void Main(string[] args)
        {
            printHeadline();

            Console.WriteLine("\nAvailable Templates:\n");
            string[] templates = Directory.GetFiles("../../../../templates");
            listFiles(templates);

            Console.WriteLine("Which Template? ");
            string template = null;
            while (String.IsNullOrEmpty(template))
            {
                template = getTemplateFromList(templates);
            }

            var madLib = new StringBuilder();
            var stringIndex = 0;

            while(stringIndex != template.Length){
                var openingTagIndex = nextOpeningTagIndex(template, stringIndex);
                int closingTagIndex;

                if(openingTagIndex > -1){
                    closingTagIndex = nextClosingTagIndex(template, openingTagIndex);
                    var token = template.Substring(openingTagIndex + 1, closingTagIndex - openingTagIndex - 1);
                    Console.WriteLine("\nEnter a{0} {1}", isVowel(token[0]) ? "n" : "", token.ToLower());
                    var replacementToken = Console.ReadLine();

                    madLib.Append(template.Substring(stringIndex, openingTagIndex - stringIndex));
                    madLib.Append(replacementToken);
                    stringIndex = closingTagIndex + 1;

                } else {
                    stringIndex = template.Length;
                }
            }

            Console.WriteLine("\nYour madlib:\n{0}", madLib.ToString());
        }
    }
}
