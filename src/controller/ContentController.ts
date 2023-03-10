import {Get, Middleware, MIDDLEWARE_PRIORITY_ACTION_HANDLER, QueryParam} from "@coralblack/cyan/dist/router";
import {BaseController} from "./BaseController";
import {HttpResponder, HttpResponse, Status as HttpStatus} from "@coralblack/cyan/dist/http";
import {Inject} from "@coralblack/cyan/dist/core";
import {ContentService} from "../service/ContentService";

export class ContentController extends BaseController {

    private readonly contentService: ContentService;

    constructor(@Inject() contentService: ContentService) {
        super();
        this.contentService = contentService;
    }

    @Get("/v1/contents/home")
    async getSponsorAll(
        @QueryParam("lang", {required: true}) lang: string
    ): Promise<HttpResponse> {
        try {
            const data = await this.contentService.getHomeContents(lang);
            return HttpResponder.done(HttpStatus.Ok, data);
        } catch(e) {
            return HttpResponder.done(HttpStatus.InternalServerError, {message: e});
        }
    }
}
