import { workspace } from "vscode";
import { Runner } from "./xsltRunner";
import * as path from 'path';
import { XSLTransformation } from "./xsltTransform";

export async function executeXSLTransformCommand(transformation: XSLTransformation) 
{
  let cmd = `java -jar ${transformation.processor} -s:- -xsl:"${transformation.xslt}"`;

  if(transformation.catalogs !== undefined && transformation.catalogs.length > 0){
    const listCatalogs = transformation.catalogs.map(catalog => `"${catalog}"`).join(";");
    cmd += ` -catalog:${listCatalogs}`;
  }
  let cwd: string | undefined;
  let commandRunner: Runner = new Runner();

  if (workspace.workspaceFolders) 
  {
    cwd = path.join(workspace.workspaceFolders[0].uri.fsPath);
  }

  console.log(cmd);
  
  commandRunner.runCommand(cmd, [], transformation.xml, cwd);
}