import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MaterialService } from '../services/material.service';
//import * as mammoth from 'mammoth';

@Component({
  selector: 'app-material-presentation',
  templateUrl: './material-presentation.component.html',
  styleUrls: ['./material-presentation.component.less']
})
export class MaterialPresentationComponent implements OnInit {
  
  urlOk?: string;
  data: any = {};
  idMaterial?: any;
  idCategoria?: any;
  nombreCategoria?: string;
  resourceUrl?: SafeResourceUrl | null = null; 


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService<any>,
    private sanitizer: DomSanitizer,
    private materialService: MaterialService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idMaterial = params.idMaterial;
      this.idCategoria = params.idCategory;
      this.nombreCategoria = params.nombreCategoria;
      this.materialService.getMaterialById(this.idMaterial).subscribe({
        next:(response) => {
          this.data = response;
          this.getSafeResourceUrl(this.data.url, this.data.tipoMaterial);
        },
        error:(error) => {
          console.error(error);
        }
      }
      );
    });
  }

  getSafeResourceUrl(url: string, tipoMaterial: string) {
    
    if(tipoMaterial && url ){

      if(tipoMaterial == "PDF" ||  tipoMaterial == "TXT" || tipoMaterial == "VIDEO"){
        this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertirVistaPreviaPdf(url));
      }else if( tipoMaterial == "PPT"){
        this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertirVistaPreviaPpt(url));
      }else if(tipoMaterial == "WORD" || tipoMaterial == "EXCEL"){
        this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
      }
    }
    else{
    }
   
  }


    // para PPT
    convertirVistaPreviaPpt(editUrl: string): string {
      if (editUrl.includes('/edit')) {
        const baseUrl = editUrl.split('/edit')[0];
        const previewUrl = `${baseUrl}/embed`;
        return previewUrl;
      } else {
        return editUrl;
      }
    }
  
    convertirVistaPreviaPdf(editUrl: string){
      // Reemplaza "view" por "preview" en la URL de Google Drive
      const previewUrl = editUrl.replace("/view", "/preview");
      return previewUrl;
    }

  clearSearch() {}

  redirect(): void {
    this.router.navigate(['materials/category/' + this.idCategoria + '/' + this.nombreCategoria]);
  }

  download(url: string) {
    // URL del archivo en Google Drive (asegúrate de que sea público)
    const googleDriveUrl = "https://drive.google.com/file/d/18PnOtnMV5OD1dJDBTcmmXQHmZo3fv1aY/view?usp=drive_link";
  
    // Obtenemos el identificador único del archivo desde la URL
    const fileId = this.getFileIdFromGoogleDriveUrl(url);
  
    if (fileId) {
   
      const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
      const hiddenLink = document.createElement('a');
      hiddenLink.href = directDownloadUrl;
      //hiddenLink.target = '_blank'; // Opcional, abrir en una nueva ventana
      hiddenLink.download = 'nombre_del_archivo'; // Establece el nombre de archivo deseado
      hiddenLink.style.display = 'none';
      
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
      document.body.removeChild(hiddenLink);
    } 
  }
  
  getFileIdFromGoogleDriveUrl(url: string): string | null {

    const pdfRegex = /\/file\/d\/([^/]+)\//;
    const videoRegex = /\/file\/d\/([^/]+)\//;
    const txtRegex = /\/file\/d\/([^/]+)\//;
    const pptRegex = /\/presentation\/d\/([^/]+)\//;
    const wordRegex = /\/document\/d\/([^/]+)\//;
    const excelRegex = /\/spreadsheets\/d\/([^/]+)\//;
  
    if (pdfRegex.test(url)) {
      const match = url.match(pdfRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    } else if (videoRegex.test(url)) {
      const match = url.match(videoRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    } else if (txtRegex.test(url)) {
      const match = url.match(txtRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    } else if (pptRegex.test(url)) {
      const match = url.match(pptRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    } else if (wordRegex.test(url)) {
      const match = url.match(wordRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    } else if (excelRegex.test(url)) {
      const match = url.match(excelRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    }
  
    return null;
  }
  

  
  
}
