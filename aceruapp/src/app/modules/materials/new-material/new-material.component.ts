import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialService } from '../services/material.service';
import { Material } from '../model/model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.less'],
})
export class NewMaterialComponent implements OnInit {

  tipoArchivo = ['VIDEO', 'PDF', 'WORD', 'TXT', 'PPT', 'EXCEL'];
  isFileSelected = false;
  idCategoria: any;
  archivoSeleccionado: any;
  nombreCategoria: any;
  idmaterial: any;
  titulo:string = "Nuevo MaTerial";
  nombreBoton:string = "Crear"
  dataMaterial:any;
  material?:Material;
  //urlSafe?:any;
  urlPrueba?:any;

  googleSheetsUrl: string = '';
  urlSafe?: any;

  constructor(
    private toster: ToastrService,
    private fb: FormBuilder,
    private materiaService: MaterialService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  public naterialform = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    tipoMaterial: ['PDF', [Validators.required]],
    url:['', [Validators.required]],
    archivo: [''],
  });

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCategoria = parseInt(params.id);
      this.nombreCategoria = params.nombre;

      this.idmaterial = params.idmaterial; // condicionamos si es editar o nuevo
      if(this.idmaterial != null){
        this.titulo = "Editar Material";
        this.nombreBoton = "Actualizar";

        this.materiaService.getMaterialById(this.idmaterial).subscribe({
          next:(data) => {
            this.dataMaterial = data; // porque no guarda los datos en dataMaterial

            this.naterialform.controls['id'].setValue(data.id);
            this.naterialform.controls['nombre'].setValue(data.nombre);
            this.naterialform.controls['descripcion'].setValue(data.descripcion);
            this.naterialform.controls['tipoMaterial'].setValue(data.tipoMaterial);
            this.naterialform.controls['url'].setValue(data.url);
            this.mostrarvistaprevia();
            this.isFileSelected = true;

          },
          error:(error) => {
          }
        })
      }
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.naterialform.controls[field].errors &&
      this.naterialform.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.naterialform.controls[field]) return null;

    const errors = this.naterialform.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
      }
    }
    return null;
  }

  getFileAcceptValue(): string {
    const selectedType = this.naterialform.get('tipoMaterial')?.value;

    switch (selectedType) {
      case 'VIDEO':
        return 'video/*';
      case 'PDF':
        return 'application/pdf';
      case 'WORD':
        return 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'TXT':
        return 'text/plain';
      case 'PPT':
        return '.pptx';
      default:
        return '';
    }
  }

  saveMaterial(): void {
    if (this.naterialform.invalid) {
      return;
    }


    let mensaje = "Material creada exitosamente!"

    this.material = {
      id:undefined,
      nombre: this.naterialform.get('nombre')?.value,
      descripcion: this.naterialform.get('descripcion')?.value,
      tipoMaterial: this.naterialform.get('tipoMaterial')?.value,
      url: this.naterialform.get('url')?.value,
      material: {
        id: this.idCategoria
      }
    };

    //const formData = new FormData();

    if(this.idmaterial){
      mensaje = "Material actualizado exitosamente!"
      this.material.id = parseInt(this.idmaterial);
    }

    this.materiaService.createMaterial(this.material).subscribe({
      next: (resp) => {
        this.toster.success(mensaje);
        this.redirect();
      },
      error: (error) => {
        this.toster.error('Error al realizar accion en material');
      }
    });
  }

  redirect(): void {
    this.router.navigate(['materials/category/' + this.idCategoria + '/' + this.nombreCategoria]);
  }

  mostrarvistaprevia() {
    console.log(this.naterialform.get('tipoMaterial')?.value)

    if(this.naterialform.get('tipoMaterial')?.value && this.naterialform.get('url')?.value ){
      let tipo = this.naterialform.get('tipoMaterial')?.value;
      let url = this.naterialform.get('url')?.value;
      if(tipo == "PDF" ||  tipo == "TXT" || tipo == "VIDEO"){
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertirVistaPreviaPdf(url));
      }else if( tipo == "PPT"){
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertirVistaPreviaPpt(url));
      }else if(tipo == "WORD" || tipo == "EXCEL"){
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.naterialform.get('url')?.value)
      }
      this.isFileSelected = true;
    }
    else{
      this.isFileSelected = false;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("");
    }

  }

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

  borrarVistaPreviaYURL() {
    // Establece la URL en blanco (vacío)
    this.naterialform.get('url')?.setValue('');
    // Establece la vista previa del iframe en blanco (vacío)
    //this.urlSafe = "sjsjsjsdhdhj";

  }


}
