(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/store.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.0_@babel+core@7.29.7_@types+node@24.10.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.0_@babel+core@7.29.7_@types+node@24.10.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/achats.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$tirelire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/tirelire.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$objectifs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/objectifs.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function StoreProvider({ children }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [utilisateur, setUtilisateur] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        prenom: '',
        nom: '',
        email: '',
        role: 'USER'
    });
    const [achats, setAchats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [objectifs, setObjectifs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [solde, setSolde] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalDepose, setTotalDepose] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalRetire, setTotalRetire] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const loadTirelire = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[loadTirelire]": async ()=>{
            const [resume, historique] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$tirelire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTirelire"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$tirelire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTransactions"])()
            ]);
            setSolde(resume.solde);
            setTotalDepose(resume.totalDepose);
            setTotalRetire(resume.totalRetire);
            setTransactions(historique);
        }
    }["StoreProvider.useCallback[loadTirelire]"], []);
    const loadAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[loadAll]": async ()=>{
            setError(null);
            try {
                const [user, achatsData, objectifsData] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["me"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAchats"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$objectifs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchObjectifs"])(),
                    loadTirelire()
                ]);
                setUtilisateur({
                    prenom: user.prenom,
                    nom: user.nom,
                    email: user.email,
                    role: user.role
                });
                setAchats(achatsData);
                setObjectifs(objectifsData);
            } catch  {
                setError("Impossible de charger tes données. Vérifie que l'API est bien lancée.");
            } finally{
                setLoading(false);
            }
        }
    }["StoreProvider.useCallback[loadAll]"], [
        loadTirelire
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            loadAll();
        }
    }["StoreProvider.useEffect"], [
        loadAll
    ]);
    /* ----------------------------- Achats ----------------------------- */ const addAchat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addAchat]": async (data)=>{
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAchat"])(data);
            setAchats({
                "StoreProvider.useCallback[addAchat]": (prev)=>[
                        created,
                        ...prev
                    ]
            }["StoreProvider.useCallback[addAchat]"]);
            return created.id;
        }
    }["StoreProvider.useCallback[addAchat]"], []);
    const updateAchat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateAchat]": (id, data)=>{
            setAchats({
                "StoreProvider.useCallback[updateAchat]": (prev)=>{
                    const current = prev.find({
                        "StoreProvider.useCallback[updateAchat].current": (a)=>a.id === id
                    }["StoreProvider.useCallback[updateAchat].current"]);
                    if (!current) return prev;
                    const merged = {
                        ...current,
                        ...data
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAchatApi"])(id, {
                        nom: merged.nom,
                        description: merged.description,
                        priorite: merged.priorite,
                        dateLimite: merged.dateLimite,
                        categorie: merged.categorie
                    }).then({
                        "StoreProvider.useCallback[updateAchat]": (updated)=>setAchats({
                                "StoreProvider.useCallback[updateAchat]": (p)=>p.map({
                                        "StoreProvider.useCallback[updateAchat]": (a)=>a.id === id ? {
                                                ...updated,
                                                articles: a.articles
                                            } : a
                                    }["StoreProvider.useCallback[updateAchat]"])
                            }["StoreProvider.useCallback[updateAchat]"])
                    }["StoreProvider.useCallback[updateAchat]"]).catch({
                        "StoreProvider.useCallback[updateAchat]": ()=>setError("La modification de l'achat a échoué.")
                    }["StoreProvider.useCallback[updateAchat]"]);
                    return prev.map({
                        "StoreProvider.useCallback[updateAchat]": (a)=>a.id === id ? merged : a
                    }["StoreProvider.useCallback[updateAchat]"]);
                }
            }["StoreProvider.useCallback[updateAchat]"]);
        }
    }["StoreProvider.useCallback[updateAchat]"], []);
    const deleteAchat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[deleteAchat]": (id)=>{
            setAchats({
                "StoreProvider.useCallback[deleteAchat]": (prev)=>prev.filter({
                        "StoreProvider.useCallback[deleteAchat]": (a)=>a.id !== id
                    }["StoreProvider.useCallback[deleteAchat]"])
            }["StoreProvider.useCallback[deleteAchat]"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteAchatApi"])(id).catch({
                "StoreProvider.useCallback[deleteAchat]": ()=>{
                    setError("La suppression de l'achat a échoué.");
                    loadAll();
                }
            }["StoreProvider.useCallback[deleteAchat]"]);
        }
    }["StoreProvider.useCallback[deleteAchat]"], [
        loadAll
    ]);
    /** Debite la tirelire du montant des articles achetés, puis clôture l'achat (RB12 vérifiée côté serveur). */ const cloturerAchat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[cloturerAchat]": async (id)=>{
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloturerAchatApi"])(id);
            setAchats({
                "StoreProvider.useCallback[cloturerAchat]": (prev)=>prev.map({
                        "StoreProvider.useCallback[cloturerAchat]": (a)=>a.id === id ? updated : a
                    }["StoreProvider.useCallback[cloturerAchat]"])
            }["StoreProvider.useCallback[cloturerAchat]"]);
            await loadTirelire();
        }
    }["StoreProvider.useCallback[cloturerAchat]"], [
        loadTirelire
    ]);
    /* ----------------------------- Articles ----------------------------- */ const addArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addArticle]": async (achatId, data)=>{
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createArticle"])(achatId, {
                nom: data.nom,
                description: data.description,
                photoUrl: data.photo,
                quantite: data.quantite,
                prixUnitaire: data.prixUnitaire,
                source: data.source
            });
            setAchats({
                "StoreProvider.useCallback[addArticle]": (prev)=>prev.map({
                        "StoreProvider.useCallback[addArticle]": (a)=>a.id === achatId ? {
                                ...a,
                                articles: [
                                    ...a.articles,
                                    created
                                ]
                            } : a
                    }["StoreProvider.useCallback[addArticle]"])
            }["StoreProvider.useCallback[addArticle]"]);
        }
    }["StoreProvider.useCallback[addArticle]"], []);
    const updateArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateArticle]": (achatId, articleId, data)=>{
            setAchats({
                "StoreProvider.useCallback[updateArticle]": (prev)=>{
                    const achat = prev.find({
                        "StoreProvider.useCallback[updateArticle].achat": (a)=>a.id === achatId
                    }["StoreProvider.useCallback[updateArticle].achat"]);
                    const article = achat?.articles.find({
                        "StoreProvider.useCallback[updateArticle]": (ar)=>ar.id === articleId
                    }["StoreProvider.useCallback[updateArticle]"]);
                    if (!achat || !article) return prev;
                    const merged = {
                        ...article,
                        ...data
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateArticleApi"])(articleId, {
                        nom: merged.nom,
                        description: merged.description,
                        photoUrl: merged.photo,
                        quantite: merged.quantite,
                        prixUnitaire: merged.prixUnitaire,
                        source: merged.source
                    }).then({
                        "StoreProvider.useCallback[updateArticle]": (updated)=>setAchats({
                                "StoreProvider.useCallback[updateArticle]": (p)=>p.map({
                                        "StoreProvider.useCallback[updateArticle]": (a)=>a.id === achatId ? {
                                                ...a,
                                                articles: a.articles.map({
                                                    "StoreProvider.useCallback[updateArticle]": (ar)=>ar.id === articleId ? updated : ar
                                                }["StoreProvider.useCallback[updateArticle]"])
                                            } : a
                                    }["StoreProvider.useCallback[updateArticle]"])
                            }["StoreProvider.useCallback[updateArticle]"])
                    }["StoreProvider.useCallback[updateArticle]"]).catch({
                        "StoreProvider.useCallback[updateArticle]": ()=>setError("La modification de l'article a échoué.")
                    }["StoreProvider.useCallback[updateArticle]"]);
                    return prev.map({
                        "StoreProvider.useCallback[updateArticle]": (a)=>a.id === achatId ? {
                                ...a,
                                articles: a.articles.map({
                                    "StoreProvider.useCallback[updateArticle]": (ar)=>ar.id === articleId ? merged : ar
                                }["StoreProvider.useCallback[updateArticle]"])
                            } : a
                    }["StoreProvider.useCallback[updateArticle]"]);
                }
            }["StoreProvider.useCallback[updateArticle]"]);
        }
    }["StoreProvider.useCallback[updateArticle]"], []);
    const deleteArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[deleteArticle]": (achatId, articleId)=>{
            setAchats({
                "StoreProvider.useCallback[deleteArticle]": (prev)=>prev.map({
                        "StoreProvider.useCallback[deleteArticle]": (a)=>a.id === achatId ? {
                                ...a,
                                articles: a.articles.filter({
                                    "StoreProvider.useCallback[deleteArticle]": (ar)=>ar.id !== articleId
                                }["StoreProvider.useCallback[deleteArticle]"])
                            } : a
                    }["StoreProvider.useCallback[deleteArticle]"])
            }["StoreProvider.useCallback[deleteArticle]"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteArticleApi"])(articleId).catch({
                "StoreProvider.useCallback[deleteArticle]": ()=>{
                    setError("La suppression de l'article a échoué.");
                    loadAll();
                }
            }["StoreProvider.useCallback[deleteArticle]"]);
        }
    }["StoreProvider.useCallback[deleteArticle]"], [
        loadAll
    ]);
    const setArticleStatut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setArticleStatut]": (achatId, articleId, statut)=>{
            setAchats({
                "StoreProvider.useCallback[setArticleStatut]": (prev)=>prev.map({
                        "StoreProvider.useCallback[setArticleStatut]": (a)=>a.id === achatId ? {
                                ...a,
                                articles: a.articles.map({
                                    "StoreProvider.useCallback[setArticleStatut]": (ar)=>ar.id === articleId ? {
                                            ...ar,
                                            statut
                                        } : ar
                                }["StoreProvider.useCallback[setArticleStatut]"])
                            } : a
                    }["StoreProvider.useCallback[setArticleStatut]"])
            }["StoreProvider.useCallback[setArticleStatut]"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$achats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateArticleStatutApi"])(articleId, statut).catch({
                "StoreProvider.useCallback[setArticleStatut]": ()=>{
                    setError("Le changement de statut a échoué.");
                    loadAll();
                }
            }["StoreProvider.useCallback[setArticleStatut]"]);
        }
    }["StoreProvider.useCallback[setArticleStatut]"], [
        loadAll
    ]);
    /* ----------------------------- Tirelire ----------------------------- */ const deposer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[deposer]": (montant, motif)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$tirelire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deposerApi"])(montant, motif).then(loadTirelire).catch({
                "StoreProvider.useCallback[deposer]": ()=>setError('Le dépôt a échoué.')
            }["StoreProvider.useCallback[deposer]"]);
        }
    }["StoreProvider.useCallback[deposer]"], [
        loadTirelire
    ]);
    const retirer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[retirer]": (montant, motif)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$tirelire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["retirerApi"])(montant, motif).then(loadTirelire).catch({
                "StoreProvider.useCallback[retirer]": ()=>setError('Solde insuffisant ou retrait refusé par le serveur.')
            }["StoreProvider.useCallback[retirer]"]);
            return true;
        }
    }["StoreProvider.useCallback[retirer]"], [
        loadTirelire
    ]);
    /* ----------------------------- Objectifs ----------------------------- */ const addObjectif = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addObjectif]": (data)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$objectifs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createObjectif"])(data).then({
                "StoreProvider.useCallback[addObjectif]": (created)=>setObjectifs({
                        "StoreProvider.useCallback[addObjectif]": (prev)=>[
                                created,
                                ...prev
                            ]
                    }["StoreProvider.useCallback[addObjectif]"])
            }["StoreProvider.useCallback[addObjectif]"]).catch({
                "StoreProvider.useCallback[addObjectif]": ()=>setError("La création de l'objectif a échoué.")
            }["StoreProvider.useCallback[addObjectif]"]);
        }
    }["StoreProvider.useCallback[addObjectif]"], []);
    const updateObjectif = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateObjectif]": (id, data)=>{
            setObjectifs({
                "StoreProvider.useCallback[updateObjectif]": (prev)=>{
                    const current = prev.find({
                        "StoreProvider.useCallback[updateObjectif].current": (o)=>o.id === id
                    }["StoreProvider.useCallback[updateObjectif].current"]);
                    if (!current) return prev;
                    const merged = {
                        ...current,
                        ...data
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$objectifs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateObjectifApi"])(id, {
                        nom: merged.nom,
                        description: merged.description,
                        montantCible: merged.montantCible,
                        montantEpargne: merged.montantEpargne,
                        dateCible: merged.dateCible,
                        categorie: merged.categorie
                    }).then({
                        "StoreProvider.useCallback[updateObjectif]": (updated)=>setObjectifs({
                                "StoreProvider.useCallback[updateObjectif]": (p)=>p.map({
                                        "StoreProvider.useCallback[updateObjectif]": (o)=>o.id === id ? updated : o
                                    }["StoreProvider.useCallback[updateObjectif]"])
                            }["StoreProvider.useCallback[updateObjectif]"])
                    }["StoreProvider.useCallback[updateObjectif]"]).catch({
                        "StoreProvider.useCallback[updateObjectif]": ()=>setError("La modification de l'objectif a échoué.")
                    }["StoreProvider.useCallback[updateObjectif]"]);
                    return prev.map({
                        "StoreProvider.useCallback[updateObjectif]": (o)=>o.id === id ? merged : o
                    }["StoreProvider.useCallback[updateObjectif]"]);
                }
            }["StoreProvider.useCallback[updateObjectif]"]);
        }
    }["StoreProvider.useCallback[updateObjectif]"], []);
    const deleteObjectif = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[deleteObjectif]": (id)=>{
            setObjectifs({
                "StoreProvider.useCallback[deleteObjectif]": (prev)=>prev.filter({
                        "StoreProvider.useCallback[deleteObjectif]": (o)=>o.id !== id
                    }["StoreProvider.useCallback[deleteObjectif]"])
            }["StoreProvider.useCallback[deleteObjectif]"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$objectifs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteObjectifApi"])(id).catch({
                "StoreProvider.useCallback[deleteObjectif]": ()=>{
                    setError("La suppression de l'objectif a échoué.");
                    loadAll();
                }
            }["StoreProvider.useCallback[deleteObjectif]"]);
        }
    }["StoreProvider.useCallback[deleteObjectif]"], [
        loadAll
    ]);
    const ajouterAObjectif = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[ajouterAObjectif]": (id, montant)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$objectifs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contribuerObjectifApi"])(id, montant).then({
                "StoreProvider.useCallback[ajouterAObjectif]": (updated)=>setObjectifs({
                        "StoreProvider.useCallback[ajouterAObjectif]": (prev)=>prev.map({
                                "StoreProvider.useCallback[ajouterAObjectif]": (o)=>o.id === id ? updated : o
                            }["StoreProvider.useCallback[ajouterAObjectif]"])
                    }["StoreProvider.useCallback[ajouterAObjectif]"])
            }["StoreProvider.useCallback[ajouterAObjectif]"]).catch({
                "StoreProvider.useCallback[ajouterAObjectif]": ()=>setError("L'ajout à l'objectif a échoué.")
            }["StoreProvider.useCallback[ajouterAObjectif]"]);
        }
    }["StoreProvider.useCallback[ajouterAObjectif]"], []);
    /* ----------------------------- Profil ----------------------------- */ const updateUtilisateur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateUtilisateur]": (data)=>{
            setUtilisateur({
                "StoreProvider.useCallback[updateUtilisateur]": (prev)=>{
                    const merged = {
                        ...prev,
                        ...data
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProfile"])({
                        prenom: merged.prenom,
                        nom: merged.nom
                    }).catch({
                        "StoreProvider.useCallback[updateUtilisateur]": ()=>setError('La mise à jour du profil a échoué.')
                    }["StoreProvider.useCallback[updateUtilisateur]"]);
                    return merged;
                }
            }["StoreProvider.useCallback[updateUtilisateur]"]);
        }
    }["StoreProvider.useCallback[updateUtilisateur]"], []);
    const value = {
        loading,
        error,
        utilisateur,
        achats,
        transactions,
        objectifs,
        solde,
        totalDepose,
        totalRetire,
        addAchat,
        updateAchat,
        deleteAchat,
        cloturerAchat,
        addArticle,
        updateArticle,
        deleteArticle,
        setArticleStatut,
        deposer,
        retirer,
        addObjectif,
        updateObjectif,
        deleteObjectif,
        ajouterAObjectif,
        updateUtilisateur,
        refresh: loadAll
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/store.tsx",
        lineNumber: 352,
        columnNumber: 10
    }, this);
}
_s(StoreProvider, "U5uvNdLDxQ4JjCbQ0jQKVe3a/1Y=");
_c = StoreProvider;
function useStore() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!ctx) throw new Error('useStore doit être utilisé dans un StoreProvider');
    return ctx;
}
_s1(useStore, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.0_@babel+core@7.29.7_@types+node@24.10.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$19$2e$0$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.19.0/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$19$2e$0$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$24$2e$10$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Rafraichissement automatique du token si une requete renvoie 401 (session expiree)
let isRefreshing = false;
api.interceptors.response.use((response)=>response, async (error)=>{
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && !isRefreshing) {
        original._retry = true;
        isRefreshing = true;
        try {
            await api.post('/api/auth/refresh');
            isRefreshing = false;
            return api(original);
        } catch  {
            isRefreshing = false;
        }
    }
    return Promise.reject(error);
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractErrorMessage",
    ()=>extractErrorMessage,
    "login",
    ()=>login,
    "loginWithApple",
    ()=>loginWithApple,
    "loginWithGoogle",
    ()=>loginWithGoogle,
    "logout",
    ()=>logout,
    "me",
    ()=>me,
    "register",
    ()=>register,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
async function register(data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/auth/register', data);
    return res.data;
}
async function login(data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/auth/login', data);
    return res.data;
}
async function loginWithGoogle(idToken) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/auth/google', {
        idToken
    });
    return res.data;
}
async function loginWithApple(identityToken, prenom, nom) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/auth/apple', {
        identityToken,
        prenom,
        nom
    });
    return res.data;
}
async function me() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/api/auth/me');
    return res.data;
}
async function updateProfile(data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put('/api/auth/me', data);
    return res.data;
}
async function logout() {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/auth/logout');
}
function extractErrorMessage(err) {
    const anyErr = err;
    return anyErr?.response?.data?.message ?? 'Une erreur est survenue. Reessaie.';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/achats.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloturerAchatApi",
    ()=>cloturerAchatApi,
    "createAchat",
    ()=>createAchat,
    "createArticle",
    ()=>createArticle,
    "deleteAchatApi",
    ()=>deleteAchatApi,
    "deleteArticleApi",
    ()=>deleteArticleApi,
    "fetchAchats",
    ()=>fetchAchats,
    "updateAchatApi",
    ()=>updateAchatApi,
    "updateArticleApi",
    ()=>updateArticleApi,
    "updateArticleStatutApi",
    ()=>updateArticleStatutApi,
    "uploadArticlePhoto",
    ()=>uploadArticlePhoto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
/* ------------------------------------------------------------------ */ /* Mapping API -> types du front (utilises tels quels par les composants) */ /* ------------------------------------------------------------------ */ function mapArticle(a) {
    return {
        id: String(a.id),
        nom: a.nom,
        description: a.description ?? undefined,
        photo: a.photoUrl ?? undefined,
        quantite: a.quantite,
        prixUnitaire: a.prixUnitaire,
        source: a.source ?? undefined,
        statut: a.statut
    };
}
function mapAchat(a) {
    return {
        id: String(a.id),
        nom: a.nom,
        description: a.description ?? undefined,
        priorite: a.priorite,
        dateLimite: a.dateLimite ?? undefined,
        categorie: a.categorie,
        articles: a.articles.map(mapArticle),
        statut: a.statut
    };
}
async function fetchAchats() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/api/achats');
    return res.data.map(mapAchat);
}
async function createAchat(data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/achats', data);
    return mapAchat(res.data);
}
async function updateAchatApi(id, data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put(`/api/achats/${id}`, data);
    return mapAchat(res.data);
}
async function deleteAchatApi(id) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete(`/api/achats/${id}`);
}
async function cloturerAchatApi(id) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/api/achats/${id}/cloturer`);
    return mapAchat(res.data);
}
async function createArticle(achatId, data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/api/achats/${achatId}/articles`, data);
    return mapArticle(res.data);
}
async function updateArticleApi(articleId, data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put(`/api/articles/${articleId}`, data);
    return mapArticle(res.data);
}
async function updateArticleStatutApi(articleId, statut) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch(`/api/articles/${articleId}/statut`, {
        statut
    });
    return mapArticle(res.data);
}
async function deleteArticleApi(articleId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete(`/api/articles/${articleId}`);
}
async function uploadArticlePhoto(file) {
    const formData = new FormData();
    formData.append('file', file);
    const base = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].defaults.baseURL ?? '';
    const res = await fetch(`${base}/api/uploads/photo`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });
    if (!res.ok) {
        throw new Error("L'envoi de la photo a échoué");
    }
    const data = await res.json();
    // L'API renvoie un chemin relatif (/uploads/xxx) : on le resout en URL absolue vers le backend.
    return `${base}${data.url}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/objectifs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contribuerObjectifApi",
    ()=>contribuerObjectifApi,
    "createObjectif",
    ()=>createObjectif,
    "deleteObjectifApi",
    ()=>deleteObjectifApi,
    "fetchObjectifs",
    ()=>fetchObjectifs,
    "updateObjectifApi",
    ()=>updateObjectifApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
function mapObjectif(o) {
    return {
        id: String(o.id),
        nom: o.nom,
        description: o.description ?? undefined,
        montantCible: o.montantCible,
        montantEpargne: o.montantEpargne,
        dateCible: o.dateCible ?? undefined,
        categorie: o.categorie
    };
}
async function fetchObjectifs() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/api/objectifs');
    return res.data.map(mapObjectif);
}
async function createObjectif(data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/objectifs', data);
    return mapObjectif(res.data);
}
async function updateObjectifApi(id, data) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].put(`/api/objectifs/${id}`, data);
    return mapObjectif(res.data);
}
async function deleteObjectifApi(id) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete(`/api/objectifs/${id}`);
}
async function contribuerObjectifApi(id, montant) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/api/objectifs/${id}/contribution`, {
        montant
    });
    return mapObjectif(res.data);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/tirelire.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deposerApi",
    ()=>deposerApi,
    "fetchTirelire",
    ()=>fetchTirelire,
    "fetchTransactions",
    ()=>fetchTransactions,
    "retirerApi",
    ()=>retirerApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
function mapTransaction(t) {
    return {
        id: String(t.id),
        type: t.type,
        montant: t.montant,
        motif: t.motif,
        date: t.date
    };
}
async function fetchTirelire() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/api/tirelire');
    return {
        solde: res.data.solde,
        totalDepose: res.data.totalDepose,
        totalRetire: res.data.totalRetire
    };
}
async function fetchTransactions() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/api/tirelire/transactions');
    return res.data.map(mapTransaction);
}
async function deposerApi(montant, motif) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/tirelire/depot', {
        montant,
        motif
    });
}
async function retirerApi(montant, motif) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/api/tirelire/retrait', {
        montant,
        motif
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0rcsugz._.js.map