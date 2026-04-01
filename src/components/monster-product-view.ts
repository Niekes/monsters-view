import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import globalStyles from "../index.css?inline";
import { queryFn } from "../lib/request-helper";
import "../components/vi-card";
import "../components/vi-filter-bar";
import "../components/vi-badge";
import { COLORS } from "../constants/colors-contants";
import type { Color } from "../types/color-types";

const POKE_API_URL = "https://pokeapi.co/api/v2";

const monsterEndpoint = `${POKE_API_URL}/pokemon`;
const typeEndpoint = `${POKE_API_URL}/type`;

type MonsterDetails = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: Type }[];
};

type Monster = {
  name: string;
  url: string;
  details?: MonsterDetails;
};

type Type = {
  name: string;
  url: string;
};

type ApiResponse<T> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
};

type PokemonApiResponse = ApiResponse<Monster>;
type TypeApiResponse = ApiResponse<Type>;

@customElement("monster-product-view")
export class MonsterProductView extends LitElement {
  @state() private _types: Type[] = [];
  @state() private _monsterMap: Map<string, Monster> = new Map();
  @state() private _typeColorMap: Map<string, Color> = new Map();

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._getInitialData();
  }

  async _getInitialData() {
    try {
      const { results } = await this._getAllMonster();

      this._loadData(results);

      queryFn<TypeApiResponse>(typeEndpoint).then((result) => {
        this._types = result.results.map((type: Type, index: number) => {
          const typed = {
            ...type,
            size: "sm",
            selected: false,
            variant: COLORS[index % COLORS.length],
          };

          this._typeColorMap.set(type.name, typed.variant);

          return typed;
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  _loadData(monsters: Monster[]) {
    const newMap = new Map<string, Monster>();
    monsters.forEach((monster) => newMap.set(monster.name, monster));
    this._monsterMap = newMap;

    const monsterUrls: string[] = this.monsters.map((p: Monster) => p.url);

    for (const pokemonUrl of monsterUrls) {
      queryFn<MonsterDetails>(pokemonUrl).then((details) => {
        const m = this._monsterMap.get(details.name);

        if (m) {
          const updated = { ...m, details };
          this._monsterMap = new Map(this._monsterMap).set(
            details.name,
            updated,
          );
        }
      });
    }
  }

  _getAllMonster() {
    return queryFn<PokemonApiResponse>(monsterEndpoint);
  }

  _getFilteredMonsters(filter: string) {
    return queryFn<{ pokemon: { pokemon: Monster }[] }>(
      `${POKE_API_URL}/type/${filter}`,
    );
  }

  async _handleFilterToggle(e: CustomEvent<{ items: Type[] }>) {
    const { items: filter } = e.detail;
    const [activeFilter] = filter.filter((f) =>
      "selected" in f ? f.selected : false,
    );

    if (!activeFilter) {
      const { results } = await this._getAllMonster();

      this._loadData(results);

      this._types = this._types.map((t) => ({
        ...t,
        selected: false,
      }));
    }

    if (activeFilter) {
      const { name: filter } = activeFilter;
      const { pokemon } = await this._getFilteredMonsters(filter);
      const monsters: Monster[] = pokemon.map((p) => p.pokemon);
      this._loadData(monsters);
      this._types = this._types.map((t) => ({
        ...t,
        selected: t.name === filter,
      }));
    }
  }

  get monsters() {
    return Array.from(this._monsterMap.values());
  }

  render() {
    return html`
      <div class="flex flex-col gap-4 p-6">
        <slot class="text-slate-900 text-xl font-semibold" name="header"></slot>

        <div class="grid gap-4 md:grid-cols-10">
          <vi-filter-bar
            @filter-toggle=${this._handleFilterToggle}
            class="md:col-span-2"
            .items=${this._types}
            .getLabel=${(type: Type) => type.name}
            .getValue=${(type: Type) => type.name}
          >
            <h2 slot="title" class="text-slate-500 text-md font-light">
              Filter by type
            </h2>
          </vi-filter-bar>

          <div
            class="grid gap-4 md:col-span-8"
            style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"
          >
            ${this.monsters.length > 0
              ? this.monsters.map(
                  (monster: Monster) =>
                    html`<vi-card>
                      <h2 slot="media">
                        ${monster.details
                          ? html`<img
                              slot="media"
                              src="${monster.details.sprites.front_default}"
                              class="w-full h-full object-cover p-4"
                              alt="${monster.name} image"
                            />`
                          : html`<img
                              slot="media"
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
                              class="w-full h-full object-cover fiter blur-2xl"
                              alt="${monster.name} image"
                            />`}
                      </h2>

                      <h2 slot="header" class="capitalize font-bold truncate">
                        ${monster.name}
                      </h2>

                      <div slot="footer">
                        <div class="flex gap-2">
                          ${monster.details?.types.map(
                            (types) =>
                              html`<vi-badge
                                size="xs"
                                variant=${this._typeColorMap.get(
                                  types.type.name,
                                ) as Color}
                                >${types.type.name}</vi-badge
                              >`,
                          )}
                        </div>
                      </div>
                    </vi-card>`,
                )
              : html` <h2 class="text-slate-500 text-md font-light">
                  No monster found
                </h2>`}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [unsafeCSS(globalStyles)];
}
