import { z } from "zod";

const countrySelectableKeys = [
    "id",
    "name",
    "iso3",
    "iso2",
    "numeric_code",
    "phonecode",
    "capital",
    "currency",
    "currency_name",
    "currency_symbol",
    "native",
    "region",
    "nationality",
    "latitude",
    "longitude",
    "emoji",
] as const;

const commonGetAllParams = {
    search: z.string().optional(),
    sortBy: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
    select: z.string().optional().transform((val) => {
        if (!val) return [];
        const splittedVals = val?.split(",");
        return splittedVals;
    }).refine((arr) => {
        if (!arr) return true;
        return arr.every((val) => countrySelectableKeys.includes(val as any));
    }, { message: "Values are not valid" }),
};

export const getAllCountriesValidation = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("partial"),
        page: z.string(),
        limit: z.string(),
        ...commonGetAllParams,
    }),
    z.object({
        type: z.literal("full"),
        page: z.string().optional(),
        limit: z.string().optional(),
        ...commonGetAllParams,
    }),
]);
