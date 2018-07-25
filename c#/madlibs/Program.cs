using System;
using System.IO;
using System.Collections;

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

        public static void Main(string[] args)
        {
            printHeadline();

            foreach(string arg in args){
                Console.WriteLine(arg);
            }

            Console.WriteLine("\nAvailable Templates:\n");
            string[] templates = Directory.GetFiles("../../../../templates");
            listFiles(templates);

            Console.WriteLine("Which Template? ");
            byte templateIndex = Convert.ToByte(Console.ReadLine());

            var template = File.ReadAllText(templates[templateIndex]);
            Console.WriteLine(template);

        }
    }
}
